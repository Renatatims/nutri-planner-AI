import React, { useState } from 'react';

import { Configuration, OpenAIApi } from 'openai';

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getResponse(userInput) {
  const prompt = userInput.trim();
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;
}

function NutriChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseText = await getResponse(input);
    setResponse(responseText);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default NutriChat;