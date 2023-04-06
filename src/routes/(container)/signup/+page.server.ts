import { fail, redirect, type Redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { Actions, PageServerLoad } from "./$types";
import { LuciaError } from "lucia-auth";
import { fb_auth } from "$lib/server/admin";
import { z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import type { UserRecord } from "firebase-admin/auth";
import { PrismaClient, type Habit } from '@prisma/client'

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let shouldRedirect = false;
        console.log("signup page server load");
        /* Recieved Signup form */
        const form = await request.formData();
        let email = form.get("email");
        let password = form.get("password");

        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return fail(400, { email, error: "Email and Password must not be empty." });
        }

        /* Input Validation */
        // Validate Email
        const isEmail = z.coerce.string().email();
        try {
            email = isEmail.parse(email)
        }
        catch (err) {
            if (err instanceof ZodError) {
                const message = fromZodError(err).message
                console.log(message);
                return fail(400, { email, error: message });
            }
        }

        // Validate Password 
        const lettersAndNumbersRegex = /^(?=.*[A-Za-z])(?=.*[0-9])/;
        const specialCharacterRegex = /[!-/:-@[-`{-~]/;
        const isPassword = z.coerce.string()
            .min(12, { message: "Password must be 12 or more characters long" })
            .regex(lettersAndNumbersRegex, { message: "Password must use both letters and numbers" })
            .regex(specialCharacterRegex, { message: "Password must use at least one special character" })
        try {
            password = isPassword.parse(password)
        }
        catch (err) {
            if (err instanceof ZodError) {
                const message = fromZodError(err).message
                console.log(message);
                return fail(400, { email, error: message });
            }
        }

        /* Create Firebase user */
        let fb_user: UserRecord | null = null;
        try {
            fb_user = await fb_auth.createUser({
                email: email,
                emailVerified: false,
                password: password,
            });

        }
        catch (error) {
            console.log('error: error creating new fb user:', error);
            return fail(400, { email, error: "Error creating user." });
        };
        const fb_id = fb_user.uid;
        const fb_email = fb_user.email;
        const fb_email_verified = fb_user.emailVerified;


        if (fb_user && fb_email) {
            try {
                // Create Lucia Auth User
                const user = await auth.createUser("fb_id", fb_id, {
                    password: fb_id,
                    attributes: {
                        fb_id: fb_id,
                        email: fb_email,
                        email_verified: fb_email_verified
                    }
                });
                console.log("Created new lucia auth user: " + user.userId)

                // Create default mood habit
                const prisma = new PrismaClient()
                const habit = await prisma.habit.create({
                    data: {
                        name: "Mood",
                        type: "Mood",
                        user_id: user.userId
                    }
                });
                if (!habit) return fail(500, { message: 'Failed to create habit' });

                // Create Lucia Auth Session
                // const session = await auth.createSession(user.userId);
                // Set Lucia Auth Session
                // locals.setSession(session);
                
                shouldRedirect = true;
            } catch (e) {
                // fb_id already in use
                if (e instanceof LuciaError) {
                    console.log(e.message);
                }
                else if (e instanceof Error) {
                    console.log(e.message);
                }

                return fail(400, { email, error: "Error creating account please refresh page and try again" });
            }
        }
        else {
            console.log("error: fb_user is null");
            return fail(400, { email, error: "Error creating account please refresh page and try again" });
        }

        if (shouldRedirect) {
            throw redirect(302, "/signup/success")
        }
        else {
            return fail(400, { email, error: "Error: creating account please refresh page and try again" });
        }
    }
};