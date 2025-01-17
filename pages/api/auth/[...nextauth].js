import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from "../../../lib/prisma";

export const authOptions = {
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SECRET_KEY,
    }),
  ],
  callbacks: {
    // Ensure session includes user.id and formFilled
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.formFilled = token.formFilled;
      return session;
    },

    // Add formFilled to the token
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        console.log(existingUser);
        token.id = existingUser?.id || user.id; // Use existing or newly created user ID
        token.formFilled = existingUser?.formFilled || false; // Attach formFilled
      }
      return token;
    },

    // Handle user creation on sign-in
    async signIn({ user }) {
      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name || "",
            formFilled: false,
          },
        });
      }

      return true; // Allow sign-in
    },
  }
};

export default NextAuth(authOptions);
