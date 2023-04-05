import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import { Configuration, OpenAIApi } from "openai";

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
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [kg, setKg] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("");
  const [proteinCount, setProteinCount] = useState("");
  const [caloriesCount, setCaloriesCount] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `I need a nutrition plan for a ${gender} who is ${age} years old, ${height} cm tall, and weighs ${kg} kg. I have ${
      foodRestriction
        ? "food restrictions: " + foodRestriction
        : "no food restrictions"
    }. I want a plan that provides ${
      proteinCount ? proteinCount + " grams of protein (macro)" : "enough protein"
    }, and ${caloriesCount ? caloriesCount + " calories" : "enough calories"}`;
    const response = await getResponse(prompt);
    setResponse(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        <h2>Nutrition Plan</h2>
        <FormControl required>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <TextField
          label="Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <TextField
          label="Weight (kg)"
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          required
        />
        <TextField
          label="Food restriction"
          value={foodRestriction}
          onChange={(e) => setFoodRestriction(e.target.value)}
        />
        <TextField
          label="Protein count"
          type="number"
          value={proteinCount}
          onChange={(e) => setProteinCount(e.target.value)}
        />
        <TextField
          label="Calories count"
          type="number"
          value={caloriesCount}
          onChange={(e) => setCaloriesCount(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="I agree to receive marketing emails from your company"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <Card variant="outlined" sx={{ m: '20px', borderColor: 'purple', borderWidth:'5px'}}>
        <CardContent>
          <p>{response}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default NutriChat;
