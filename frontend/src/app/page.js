"use client";
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [colours, setColours] = useState(["#FFFEee", "#FFF", "#FFF", "#FFF"]);

  async function getColourPalette(){
    try{
      const response = await fetch("http://localhost:3000/colour-palette", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt}), 
      });
      const colours = await response.json();
      setColours(colours.colors);
      setPrompt("");
    }catch{
      console.log("Something went wrong!");
    }
    
  }

  return (
    <div>
    <main className="flex flex-row w-screen relative">

      {
        colours.map(colour=>{
          return <div style={{height:"100vh",backgroundColor:colour}} className="grow"></div>
        })
      }
      
      
     <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <input type="text" maxLength="500" value={prompt} onChange={(e)=>setPrompt(e.target.value)} required placeholder="Tropical sunset"/>
      <button className="bt" onClick={getColourPalette}>Generate</button>
     </div>
   
    </main>
    </div>
  );
}
