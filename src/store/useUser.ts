import { getUserByEmail } from "@/app/actions/authActions";
import { UserType } from "@/db/schema";
import { create } from "zustand";

export interface IUseUser {
  user: UserType | undefined;
  setUser: (email: string) => Promise<void>;
}

export const useUser = create<IUseUser>((set) => ({
  user: undefined,
  setUser: async (email: string) => {
    const user = await getUserByEmail(email);

    if (!user) return;

    set({ user: user });
  },
}));
