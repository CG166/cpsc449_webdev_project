import { cookies } from "next/headers";

export async function getUserID() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("userID")?.value;
  return userID ? Number(userID) : null;
}
