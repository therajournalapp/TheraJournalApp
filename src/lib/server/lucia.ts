import lucia from "lucia-auth";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

const client = new PrismaClient();

export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD"
});

export type Auth = typeof auth;