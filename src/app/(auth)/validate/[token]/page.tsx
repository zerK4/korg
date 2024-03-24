"use client";

import React, { useEffect, useState } from "react";
import { validate } from "../../../actions/authActions";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Loader } from "lucide-react";

function Page({ params }: { params: { token: string } }) {
  const [currentTheme, setCurrentTheme] = useState<string | undefined>("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setCurrentTheme(theme);
    validate(params.token).then(() => {
      router.push("/");
    });
  }, [params.token, theme, router]);

  return (
    <div
      className={`w-[100dvw] h-[100dvh] grid place-content-center dark:cardGradient`}
    >
      <Loader size={20} />
    </div>
  );
}

export default Page;
