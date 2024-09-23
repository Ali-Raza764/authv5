"use server";
import { signIn } from "@/auth";
export const signInCredentials = async (payload) => {
  signIn("credentials", { payload, redirect: true });
};
