import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {prisma} from "../../../lib/prisma";

// Function to generate a random ID
const generateUniqueId = async () => {
  while (true) {
    // Generate a random number between 100000 and 999999
    const randomId = Math.floor(Math.random() * 900000) + 100000;
    
    // Check if this ID already exists
    const existingUser = await prisma.user.findUnique({
      where: { id: randomId },
    });
    
    // If ID doesn't exist, return it
    if (!existingUser) {
      return randomId;
    }
  }
};

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
      console.log(1);
      if (user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        console.log(2);
        token.id = existingUser?.id || user.id; // Use existing or newly created user ID
        token.formFilled = existingUser?.formFilled || false; // Attach formFilled
        console.log(3);
      }
      return token;
    },

    // Handle user creation on sign-in
    async signIn({ user }) {
      try {
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        if (!existingUser) {
          const uniqueId = await generateUniqueId();
          existingUser = await prisma.user.upsert({
            where: { email: user.email },
            update: {}, // No updates if exists
            create: {
              id: uniqueId,
              email: user.email,
              name: user.name || "",
              formFilled: false,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
  }
};

export default NextAuth(authOptions);
