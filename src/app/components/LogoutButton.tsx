"use client";
import { logoutUser } from "../actions/users";

export default function LogoutButton() {
    return (
        <button className='btn' onClick={async () => {await logoutUser();}}>
            Log out
          </button>
    );
}