# nutri-planner-AI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

The Nutri Planner AI app allows users to generate personalized meal plans based on their input parameters: weight, height, gender, food restrictions, protein count, calorie count, and any additional information. The app integrates with OPENAI API to generate optimized meal plans.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Credits](#credits)

## Installation

```
npm install
```

## Usage
The user can generate a personalized meal plan by providing specific information. In order to save the meal plan, the user must create an account. 

To use the Nutri Planner AI application, follow the steps below:

Step 1: Create an Account
Step 2: Log In
Step 3: Generate a Meal Plan
Step 4: View and Save Meal Plans
Step 5: Edit Saved Meal Plans Titles
Step 6: Expand and View Meal Plans

On the meals page, you can expand a meal plan card to view the entire meal plan.
Click on the "Expand" button on the meal plan card to see the full details of the meal plan, including individual meals and their nutritional information.

## Features

Users can input their weight, height, gender, food restrictions, protein count, calorie count, and additional information to generate a personalized meal plan.

### User Authentication and Account

- Users can create an account to access their account with saved meal plans.
- User authentication is implemented using JSON Web Tokens (JWT).
- Users can log in using their credentials and obtain a JWT for API requests.
- The app securely stores user passwords using bcrypt for hashing and comparing.

### Meal Plan Generation
- Users can input their weight, height, gender, food restrictions, protein count, calorie count, and additional information to generate a personalized meal plan.
- The app uses OPENAI to generate optimized meal plans based on the user inputs.
- The generated meal plans include information such as protein count, calorie count, carbs, and fat content.

### Saved Meal Plans
- Users can save the generated meal plans to their account.
- Each saved meal plan can have a personalized title.
- Users can edit the title of their saved meal plans.

### Meal Plan Cards and Previews
- The app displays the saved meal plans in the form of cards on the meals page.
- Each card shows a preview of the meal plan, including protein count, calorie count, carbs, and fat content.
- Users can expand a meal plan card to view the entire meal plan.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This application is covered by MIT license, available at:
https://opensource.org/licenses/MIT

## Contributing

Please feel free to send a pull request, the following is my GitHub account: https://github.com/Renatatims

## Tests

  To run the application:

  ````
  npm run develop 
  ````

## Questions

If you have any questions please contact me at:

 - GitHub account: https://github.com/Renatatims
- e-mail account: renatatims@gmail.com

# Credits

- Flaticon
  - <a href="https://www.flaticon.com/free-icons/calories" title="calories icons">Calories icons created by Freepik - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/proteins" title="Proteins icons">Proteins icons created by Flat Icons - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/bread" title="bread icons">Bread icons created by Freepik - Flaticon</a>
  - <a href="https://www.flaticon.com/free-icons/fat" title="fat icons">Fat icons created by Freepik - Flaticon</a>

- [OpenAI API](https://openai.com/)
