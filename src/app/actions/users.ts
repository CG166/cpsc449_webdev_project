'use server';

import { db } from "../db/db";
import { User } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function createUser(name: string, email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(User).values({name, email, username, password: hashedPassword});
    redirect("/");
}

export async function loginUser(username: string, password: string) {
    const [user] = await db.select().from(User).where(eq(User.username, username));
    if (!user){
        return  {success: false, message: "User not found!"};
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        return {success: false, message: "Password Incorrect!"};
    }
    
    const userCookies = await cookies();
    userCookies.set("userID", String(user.id), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

    return { success: true}
}

export async function logoutUser() {
  (await cookies()).delete("userID");
  redirect("/");
}

export async function getUserInfo(id: number) {
    const users = await db.select().from(User).where(eq(User.id, id))
    return users[0]
}

export async function updateUserInfo(id: number, name: string, email: string, username: string) {
    await db.update(User).set({name, email, username}).where(eq(User.id, id))
}