import React from "react";
import { Card } from "@mui/material";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_NUTRI_PLANS } from "../utils/queries"; 

const SavedMealPlans = () => {
  const { data } = useQuery(QUERY_NUTRI_PLANS);
  console.log(data);
  const nutriPlans = data?.nutriPlans || [];;

  return (
    <>
      {nutriPlans?.map((nutriPlan, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ m: "20px", borderColor: "#8C2E5A", borderWidth: "5px" }}
        >
          <h2>{nutriPlan.title}</h2>
          {nutriPlan.meals.split("\n").map((meal, index) => {
            const [mealInfo, mealDetails] = meal.split(":");
            const isHeader = ["Breakfast", "Snack", "Lunch", "Dinner"].includes(
              mealInfo.trim()
            );
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
        </Card>
      ))}
    </>
  );
};

export default SavedMealPlans;
