require("dotenv").config();
const express=require("express");
const cors=require("cors");
// intense of express
const app=express();
//middlewares
const corsOptions={
    origin:["http://localhost:5173","http://localhost:5174"],
};
app.use(express.json());
app.use(cors(corsOptions));
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// generate content route
app.post('/generate',async(req,res)=>{
    const {prompt}=req.body;
    try {
        
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
           
          
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            res.send(text);
          
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to generate content');
    }
})


async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = "Write a story about a AI and magic"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
//start the server
app.listen(8080,console.log("Server is running"));