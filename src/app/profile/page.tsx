import { getUserID } from "../../../lib/cookie"
import { getUserInfo } from "../actions/users";

export default async function profile() {
    const userID = await getUserID();

    if(!userID) {
        return (
        <main>
            <h1>No User Currenly Logged In!</h1>
        </main>
        );
    }

    const user = await getUserInfo(userID);

    return (
        <main>
            <h1>User Account Info</h1>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Password: {user.password}</h2>
        </main>
    );

}