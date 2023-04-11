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
  Box,
  Stack,
  IconButton,
} from "@mui/material";

import { Configuration, OpenAIApi } from "openai";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SAVE_NUTRI_PLAN } from "../utils/mutations";

// Apollo useMutation() Hook
import { useMutation } from "@apollo/client";

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getResponse(userInput) {
  const prompt = userInput.trim();
  try {
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
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the data. Please try again later.";
  }
}

function NutriChat() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [kg, setKg] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("");
  const [proteinCount, setProteinCount] = useState("");
  const [caloriesCount, setCaloriesCount] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Direct answer only: I need a nutrition plan for a ${gender} who is ${age} years old, ${height} cm tall, and weighs ${kg} kg. I have ${
      foodRestriction
        ? "food restrictions: " + foodRestriction
        : "no food restrictions"
    }. I want a plan that provides ${
      proteinCount
        ? proteinCount + " grams of protein (macro)"
        : "enough protein"
    }, and ${
      caloriesCount ? caloriesCount + " calories" : "enough calories"
    }. To build this meal plan consider the following information:${additionalInfo}.  
    I want the response to be rendered in the specific format, and please don't add any other information before or after the meal plan ( I don't want the answer to start with a paragraph, don't want any "note" included after the meal plan, just the meal plan - answer starting with breakfast, and every single food in a bullet point): 
    "Breakfast
    - (breakfast info inside)
  Snack
    - (snack info inside)
  Lunch
   - (Lunch info inside)
  Snack
    - (snack info inside)
  Dinner
    - (dinner info inside)
  Snack
    - (snack info inside)
  "`;
    const response = await getResponse(prompt);
    console.log(response);
    setResponse(response);
  };
  const [saveNutriPlan] = useMutation(SAVE_NUTRI_PLAN);

 // Define the handleSaveMealPlan function
  const handleSaveMealPlan = async () => {
    try {
      // Call the saveNutriPlan mutation with the nutriPlan object
      await saveNutriPlan({ variables: { nutriData: { meals: response } } });

      // Show a success message to the user
      alert("Nutri plan saved successfully!");
    } catch (error) {
      console.error(error);

      // Show an error message to the user
      alert("An error occurred while saving the nutri plan. Please try again later.");
    }
  };
 
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#8C2E5A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <a href="/">
          <img
            src={require("../assets/logo/nutriLogo.png")}
            alt="icon"
            height="300px"
          ></img>
        </a>
      </Box>
      <form onSubmit={handleSubmit}>
        <h3 style={{ paddingTop: "15px", paddingLeft: "20px" }}>
          Please input the following info:
        </h3>
        <Card
          variant="outlined"
          sx={{
            m: "20px",
            p: "10px",
            borderColor: "#8C2E5A",
            borderWidth: "5px",
          }}
        >
          <FormControl sx={{ p: "10px", width: "150px" }} required>
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
            sx={{ p: "10px" }}
          />
          <TextField
            label="Height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            sx={{ p: "10px" }}
          />
          <TextField
            label="Weight (kg)"
            type="number"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            required
            sx={{ p: "10px" }}
          />
          <Stack>
            <Box>
              <TextField
                label="Protein count"
                type="number"
                value={proteinCount}
                onChange={(e) => setProteinCount(e.target.value)}
                sx={{ p: "10px" }}
              />
              <TextField
                label="Calories count"
                type="number"
                value={caloriesCount}
                onChange={(e) => setCaloriesCount(e.target.value)}
                sx={{ p: "10px" }}
              />
            </Box>
            <TextField
              label="Food restrictions"
              value={foodRestriction}
              onChange={(e) => setFoodRestriction(e.target.value)}
              sx={{ p: "10px" }}
            />
            <TextField
              label="Additional Information"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              sx={{ p: "10px" }}
            />
            <FormControlLabel control={<Checkbox />} label="" />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#8C2E5A",
              "&:hover": { backgroundColor: "#6f1f46" },
            }}
          >
            Submit
          </Button>
        </Card>
      </form>
      <Card
        variant="outlined"
        sx={{ m: "20px", borderColor: "#8C2E5A", borderWidth: "5px" }}
      >
        {response ? (
          <>
            {response.split("\n").map((meal, index) => {
              const [mealInfo, mealDetails] = meal.split(":");
              const isHeader = [
                "Breakfast",
                "Snack",
                "Lunch",
                "Dinner",
              ].includes(mealInfo.trim());
              return (
                <div className="meal-section" key={index}>
                  {isHeader ? (
                    <h2
                      style={{
                        paddingLeft: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {mealInfo}
                    </h2>
                  ) : (
                    <p
                      style={{
                        paddingLeft: "30px",
                        fontSize: 20,
                      }}
                    >
                      {mealInfo}
                      {mealDetails}
                    </p>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        )}
        <IconButton onClick={handleSaveMealPlan}>
          Add to my favorites <FavoriteBorderIcon></FavoriteBorderIcon>
        </IconButton>
      </Card>
    </>
  );
}

export default NutriChat;
