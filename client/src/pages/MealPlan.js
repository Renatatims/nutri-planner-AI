import React from "react";
import { Card } from "@mui/material";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const SavedMealPlans = () => {
  const { data } = useQuery(QUERY_USER);
  const userData = data?.user || {};

  return (
    <Card
      variant="outlined"
      sx={{ m: "20px", borderColor: "#8C2E5A", borderWidth: "5px" }}
    >
      {userData.nutriPlans?.map((nutriPlan, index) => (
        <div key={index}>{nutriPlan.meals}</div>
      ))}
    </Card>
  );
};

export default SavedMealPlans;
