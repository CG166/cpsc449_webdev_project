'use client'
import { useState } from "react";
import { loginUser } from "../actions/users";
import { useRouter } from "next/navigation";


export default function Login() {
  const[data, setData] = useState({ username: '' , password: ''});
  const router = useRouter();


  const updateField = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value}));
  };

  const reset = () => {
    setData({ username: '' , password: ''});
  }

  async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
  
      if ( !data.username.trim() || !data.password.trim()) {
        return;
      }
      
      const loginAttempt = await loginUser(data.username, data.password);

      if(loginAttempt.success){
        reset();
        alert("Login Succesful!");
        console.log("Login Successful!")
        router.push("/");
      } else {
        alert("Login failed!");
        console.log("Login failed:", loginAttempt.message);
      }
  
    }

  return (
    <main>

        <div className="bg-purple-300 w-full min-h-screen flex justify-center items-center;">
            <div className="bg-white p-8 rounded flex flex-col w-[300px] self-center max-h-[90vh] overflow-auto;">
                <h1 className="text-black text-2xl font-mono;" >Log In</h1>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="username" >Username</label><br />
                    <input className="box" id="username" name="username" type="text" value={data.username} onChange={(e) => updateField("username", e.target.value)}/><br />

                    <label htmlFor="password" >Password</label><br />
                    <input className="box" id="password" name="password" type="password" value={data.password} onChange={(e) => updateField("password", e.target.value)}/><br />

                    {/* Submit Button */}
                    <button className="btn" type="submit" >Submit</button>
                </form>
            </div>
        </div>

    </main>
  );
}