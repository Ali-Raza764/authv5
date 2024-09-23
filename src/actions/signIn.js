"use server";
import { signIn } from "@/auth";
export const signInCredentials = async (payload) => {
  try {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    // signIn doesn't throw errors, it returns them in the result
    if (result?.error) {
      console.log("Authentication error:", result.error);
      return { error: result.error };
    }

    return { success: true };
  } catch (error) {
    // This catch block is for unexpected errors
    console.error("Unexpected error during sign in:", error.code);
    return { error: "An unexpected error occurred" };
  }
};
