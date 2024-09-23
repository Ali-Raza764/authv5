import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
  message = "Invalid identifier or password"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add database logic here to cofirm the password
        // throw new InvalidLoginError(); //testing to throw an error if one occurs like invalid password etc
        return {
          name: "Ali Raza Khalid",
          email: "alikillerno@gmail.com",
          avatar: "https://dummyimage.com/50X50",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.avatar = token.avatar;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
      }

      // Handle updates
      if (trigger === "update" && session) {
        // Update the token with the new data
        token.name = session.user.name;
        token.email = session.user.email;
        token.avatar = session.user.avatar;
        console.log(session.user.name);
      }

      return token;
    },
  },
});
