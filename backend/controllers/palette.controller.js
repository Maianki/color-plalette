const OpenAI = require("openai");

const getColourPalette = (req, res) => {
   const prompt = req.body.prompt;


   if(typeof prompt == 'string' && prompt.length > 0){
      let colors = [];
      (async function(){
         colors= await getPaletteFromOpenaiAPI(prompt);
         if(typeof colors?.choices != 'undefined' && colors?.choices[0]?.text){
            return res.json({
               "statusCode" : 200,
               "colors": colors?.choices[0]?.text
            });
         }else{
            return res.json({
               "statusCode" : 500,
               "message": "Internal server error!"
            });
         }
      })()
   }else{
      return res.json({
         "statusCode" : 422,
         "message": "Invalid data type for the 'prompt' field. Expected a string."
      });
   }
   // return res.json({"colors": ["Pink", "Blue"]});
};

const getPaletteFromOpenaiAPI = async (prompt)=>{
   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});
   try{ 
      const completion = await openai.completions.create({
        
         prompt: `Generate a color palette inspired by entered color, theme, keyword, or text prompt. Provide a array of four colors hex codes. Feel free to include descriptive names for each color if possible. Be creative and consider the mood or atmosphere associated with the prompt.
           A: ["#006699", "#66CCCC", "#F0E68C", "#008000", "#F08080"]
     
           Q: Convert the following verbal description of a color palette into a list of colors: sage, nature, earth
           A: ["#EDF1D6", "#9DC08B", "#609966", "#40513B"]
     
           Output Format: An array of four hexadecimal color codes
           Q: Convert the following verbal description of a color palette into a list of colors: ${prompt} 
           A:
           `,
         model: "gpt-3.5-turbo-instruct",
         max_tokens:200,
       });
       return completion;
   }catch(err){
      return err;
   }

}

module.exports = { getColourPalette };
