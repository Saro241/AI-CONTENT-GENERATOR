import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from "axios"
import "./App.css" ;
//function that must return a promise
const makeapirequest = async(prompt)=>{
  const res= await axios.post('http://localhost:8080/generate',{prompt});
    return res.data;
}

function App() {
  const [prompt,setPrompt]=useState(""); 

// mutation
const mutation=useMutation({
  mutationFn:makeapirequest,
  mutationKey:['gemini-ai-request'],
});
//handler
const submitHandler=(e)=>{
  e.preventDefault();
  mutation.mutate(prompt);
  console.log(mutation);
}
  return (
    <div className="App">
    <header>Gemini AI Content Generator</header>
    <p>ENTER YOUR QUESTIONS AND LET THE AI CREATE THE CONTENT FOR YOU.</p>
    <form className="App-form" onSubmit={submitHandler}>
      <label htmlFor="Enter your prompt:"></label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write a content about..."
        className="App-input"
      />
      <button className="App-button" type="submit">
        Generate Content
      </button>
      <section className="App-response">
        {mutation.isPending && <p>Generating your content</p>}
        {mutation.isError && <p>{mutation.error.message}</p>}
        {mutation.isSuccess && <p>{mutation.data}</p>}
      </section>
    </form>
  </div>
  )
}

export default App
