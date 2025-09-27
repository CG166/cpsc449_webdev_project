export default function ContactUs() {
  return (
    <main>
        <div className="bg-black w-full min-h-screen flex justify-center items-center;">
            <div className="bg-white p-8 rounded flex flex-col w-[300px] self-center max-h-[90vh] overflow-auto;">
                  <h1 className="text-black text-2xl font-mono;" >Contact Us</h1>
                  <form>
                      <label htmlFor="name" >Name</label><br />
                      <input className="box" id="name" type="text"/><br />

                      <label htmlFor="email ">Email</label><br />
                      <input className="box" id="email" type="email" /><br />

                      <label htmlFor="message" >Message</label><br />
                      <textarea className="box" id="message" name="message" ></textarea><br />

                      {/* Submit Button */}
                      <button className="btn" type="submit" >Submit</button>
                  </form>
            </div>
        </div>
        
    </main>
  );
}