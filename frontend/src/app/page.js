"use client";
import Image from "next/image";
import { useState } from "react";
import { FallingLines } from 'react-loader-spinner'


export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [colours, setColours] = useState(['#F8AE8A', '#F4C2F4', '#F2CD60', '#3D348B']);
  const [isload, setIsload] = useState(false);

  async function getColourPalette(){
    setIsload(true);
    try{
      const response = await fetch("http://localhost:3000/colour-palette", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt}), 
      });
      const colours = await response.json();
      console.log(colours.colors)
      setColours(colours.colors);
      setPrompt("");
      setIsload(false)
    }catch{
      setIsload(false);
      console.log("Something went wrong!");
    }
    
  }

  return (
    <div>
    <main className="flex flex-row w-screen relative">

      {
        colours.length > 0 && colours.map((colour, index )=>{
          return <div key={index} onClick={() => { navigator.clipboard.writeText(colour)} }style={{height:"100vh",backgroundColor:colour}} className="grow cursor-pointer text-center">{colour}</div>
        })
      }
      
      
     <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <input type="text" maxLength="500" value={prompt} onChange={(e)=>setPrompt(e.target.value)} required placeholder="Tropical sunset"/>
      <button className="bt" onClick={getColourPalette}> { isload ? <FallingLines
      color="#FFF"
      width="55"
      visible={true}
      ariaLabel="falling-circles-loading"
      /> : 'Generate'}</button>
     </div>
   
    </main>
    </div>
  );
}
