"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { db } from "@/db";
import { UserType, session, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 } from "uuid";
import { sendLoginEmail } from "@/lib/resend";
import { generateStrongToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "../auth/lucia";

export async function login({
  email,
  name,
}: {
  email: string;
  name?: string | null | undefined;
}): Promise<ActionResult> {
  if (email === null) {
    return {
      status: 401,
      error: "Invalid email",
    };
  }

  const token = generateStrongToken(120);

  const [exists] = await db
    .select()
    .from(users)
    .where(eq(users.email, email as string));

  // if (exists === undefined && !name) {
  //   return {
  //     status: 404,
  //     message: "Please create an account.",
  //   };
  // }

  if (exists) {
    const cookie = cookies().get(lucia.sessionCookieName);

    if (cookie) {
      await db.delete(session).where(eq(session.id, cookie?.value as string));
    }

    await db.update(users).set({ token }).where(eq(users.email, email));
    await sendLoginEmail({ to: String(email), token });

    return {
      status: 200,
      message: "Check your email for a login link.",
    };
  }

  if (email !== null) {
    const [user] = await db
      .insert(users)
      .values({
        id: v4(),
        email: email as string,
        // name: name as string,
      })
      .returning();

    if (user !== undefined) {
      await db.update(users).set({ token }).where(eq(users.email, email));
      await sendLoginEmail({ to: String(email), token });
    }

    return {
      status: 200,
      message: "Account successfully created, you can now login!",
    };
  }

  setTimeout(
    async () => {
      await db.update(users).set({ token: null }).where(eq(users.email, email));
    },
    24 * 60 * 60 * 1000,
  );
}

export async function validate(token: string) {
  "use server";
  const [user] = await db.select().from(users).where(eq(users.token, token));

  if (user !== undefined) {
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      session,
    };
  }
}

export default async function getSession() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  try {
    const result = await lucia.validateSession(sessionId);

    // Handle cookie updates within a try-catch block for robustness
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      } else if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (error) {
      console.error("Error setting session cookie:", error);
      // Consider alternative actions like logging to a monitoring service
    }

    return result;
  } catch (error) {
    console.error("Error validating session:", error);
    return {
      user: null,
      session: null,
    };
  }
}

export async function logout(): Promise<ActionResult> {
  const { session } = await getSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}

export async function getUserByEmail(
  email: string,
): Promise<UserType | undefined> {
  try {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  } catch (error) {
    console.log(error);

    throw error;
  }
}
