"use server";

import { signIn } from "@/auth";

export async function signInCredentials(payload) {
  try {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    // Check if the error is an instance of Error and has a message
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    // Fallback error message
    return { success: false, message: "An unexpected error occurred" };
  }
}
