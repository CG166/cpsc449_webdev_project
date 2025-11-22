import { getUserID } from "../../lib/cookie";
import DefaultHomepage from "./components/DefaultHomepage";
import UserHomepage from "./components/UserHomepage";

export default async function Home() {
const userID = await getUserID();
if (!userID) {
  return  <DefaultHomepage/>
}

return (
  <UserHomepage/>
);
}