import React, { useState } from "react";
import { Card, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_NUTRI_PLANS } from "../utils/queries";

//use Mutation to update the title
import { useMutation } from "@apollo/client";
import { UPDATE_NUTRI_PLAN_TITLE } from "../utils/mutations";

const SavedMealPlans = () => {
  //Define state variables for editing the title
  const [isEditing, setIsEditing] = useState({});
  const [editedTitle, setEditedTitle] = useState("");

   // QUERY_NUTRI_PLANS query to get the list of meal plans from the database
  const { data } = useQuery(QUERY_NUTRI_PLANS);
  console.log(data);
  const nutriPlans = data?.nutriPlans || [];

  // UPDATE_NUTRI_PLAN_TITLE mutation - to update a meal plan title
  const [updateTitle] = useMutation(UPDATE_NUTRI_PLAN_TITLE);

  // handleEditTitle function - to handle the edit title button click event
  const handleEditTitle = (nutriPlanId) => {
    // Set the editing state of the title with the given nutriPlanId to true
    setIsEditing((prevEditing) => ({ ...prevEditing, [nutriPlanId]: true }));
  };
  
  //handleSaveTitle function - save title button click event
  const handleSaveTitle = async (nutriPlanId) => {
    if (editedTitle.trim() !== "") {
      await updateTitle({
        variables: { nutriPlanId, title: editedTitle },
        // Refetch the QUERY_NUTRI_PLANS query to update the list of meal plans with the new title
        refetchQueries: [{ query: QUERY_NUTRI_PLANS }],
      });
      // Set the editing state of the title with the given nutriPlanId to false
      setIsEditing((prevEditing) => ({ ...prevEditing, [nutriPlanId]: false }));
    }
  };

  //handleTitleChange function -  handle the input field's change event
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  return (
    <>
      {nutriPlans?.map((nutriPlan, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{ m: "20px", borderColor: "#8C2E5A", borderWidth: "5px" }}
        >
          <h2
            style={{
              paddingLeft: "80px",
              fontWeight: "bold",
              color: "#8C2E5A",
            }}
          >
            {isEditing[nutriPlan._id] ? (
              <TextField
                value={editedTitle}
                onChange={handleTitleChange}
                label="Meal Plan Title"
              />
            ) : (
              <>
                {nutriPlan.title}{" "}
                <IconButton onClick={() => handleEditTitle(nutriPlan._id)}>
                  <EditIcon />
                </IconButton>
              </>
            )}
            {isEditing[nutriPlan._id] && (
              <IconButton onClick={() => handleSaveTitle(nutriPlan._id)}>
                <DoneIcon />
              </IconButton>
            )}
          </h2>
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
