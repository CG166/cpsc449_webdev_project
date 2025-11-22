import { cookies } from "next/headers";


export async function getUserID() {
    const cookieStore = await cookies();
    const userID = cookieStore.get("userID")?.value;

    if (!userID) return null;

    return Number(userID);
}