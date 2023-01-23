import lucia, { type User } from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

const client = new PrismaClient();

export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userData) => {
        return {
            userId: userData.id,
            email: userData.email,
            email_verified: userData.email_verified
        };
    }
});

export type Auth = typeof auth;