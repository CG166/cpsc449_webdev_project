import { cookies } from "next/headers";


export async function getUserIDAction() {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userID")?.value;

    if (!userID) return null;

    return Number(userID);
}