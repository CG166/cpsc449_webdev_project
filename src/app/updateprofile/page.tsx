'use client'

export default function Updateprofile() {
  
  return (
    <main>
        <div className="bg-purple-300 w-full min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded flex flex-col w-[80vh] self-center h-[90vh] overflow-auto;">
                <h1 className="text-black text-2xl font-mono;" >Update Profile</h1>
                <form >
                    <label htmlFor="name" >Name</label><br />
                    <input className="box" id="name" type="text" name="name" /><br />

                    <label htmlFor="email ">Email</label><br />
                    <input className="box" id="email" type="email" name="email" /><br />

                    <label htmlFor="username" >Username</label><br />
                    <input className="box" id="username" name="username" type="text"/><br />

                    {/* Submit Button */}
                    <button className="btn" type="submit" >Update</button>
                </form>
            </div>
        </div>
        
    </main>
  );
}