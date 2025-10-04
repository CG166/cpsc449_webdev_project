import Header from '../app/header/page'
import Image from "next/image";
//New Code
import Link from 'next/link';


//<Image src="/vercel.svg" alt="website icon" width={500} height={500}/>

export default function Home() {
  return (
  <main className="">
    <Header />
    <div id="Second section" className="flex bg-black items-center justify-center min-h-screen">
      <div className="flex-col"> {/* Word content contianer */}
        <h1 className="font-mono text-white text-4xl m-2">Introducing Placeholder</h1><br/>
        <p className="font-mono text-white text-xl m-2">DGribnax flurptil wendozz cramblee 
          vinktor zibberlush neftwaddle. Skrimble drandox pheelom twizzlequap jarnook blanterflee. 
          Quorflig zendoop frabblewitz, minkthra jubbledorp snarfle. Yintrop kledjask murflobbin 
          drayzunk, trallopee vinkshardle bloont.</p>
      </div>
    
    </div>

    <div id="third section">

          <div id="text section">
            <div id ="title" className="sectitle">
              <Link href="/clothing/mens">
                <h2>Mens</h2>
              </Link>
            </div>
            <div id="description" className=" w-2/3 mx-auto">
              <div id="blurb" className="blurb">
                <p>Gribnax flurptil wendozz cramblee vinktor zibberlush neftwaddle.
                   Skrimble drandox pheelom twizzlequap jarnook blanterflee. Quorflig 
                   zendoop frabblewitz, minkthra jubbledorp snarfle. Yintrop kledjask 
                   murflobbin drayzunk, trallopee vinkshardle bloont.</p>
              </div>
            </div>
          </div>
          <hr className="line"></hr>

          <div id="text section">
            <div id ="title" className="sectitle">
              <Link href="/clothing/womens">
                <h2>Womens</h2>
              </Link>
            </div>
            <div id="description" className=" w-2/3 mx-auto">
              <div id="blurb" className="blurb">
                <p>Gribnax flurptil wendozz cramblee vinktor zibberlush neftwaddle.
                   Skrimble drandox pheelom twizzlequap jarnook blanterflee. Quorflig 
                   zendoop frabblewitz, minkthra jubbledorp snarfle. Yintrop kledjask 
                   murflobbin drayzunk, trallopee vinkshardle bloont.</p>
              </div>
            </div>
          </div>
          <hr className="line"></hr>

          <div id="text section">
            <div id ="title" className="sectitle">
              <Link href="/clothing/kids">
                <h2>Kids</h2>
              </Link>
            </div>
            <div id="description" className=" w-2/3 mx-auto">
              <div id="blurb" className="blurb">
                <p>Gribnax flurptil wendozz cramblee vinktor zibberlush neftwaddle.
                   Skrimble drandox pheelom twizzlequap jarnook blanterflee. Quorflig 
                   zendoop frabblewitz, minkthra jubbledorp snarfle. Yintrop kledjask 
                   murflobbin drayzunk, trallopee vinkshardle bloont.</p>
              </div>
            </div>
          </div>
          <hr className="line"></hr>

          <div id="text section">
            <div id ="title" className="sectitle">
              <h2>Section Title</h2>
            </div>
            <div id="description" className=" w-2/3 mx-auto">
              <div id="blurb" className="blurb">
                <p>Gribnax flurptil wendozz cramblee vinktor zibberlush neftwaddle.
                   Skrimble drandox pheelom twizzlequap jarnook blanterflee. Quorflig 
                   zendoop frabblewitz, minkthra jubbledorp snarfle. Yintrop kledjask 
                   murflobbin drayzunk, trallopee vinkshardle bloont.</p>
              </div>
            </div>
          </div>

          <div className="flex bg-black justify-end items-center h-25">
            {/* Contact Us button */}
            <Link href="/contactus">
            <button className='btn' >Contact Us</button>
            </Link>
          </div>

    </div>
  </main>
  );
}