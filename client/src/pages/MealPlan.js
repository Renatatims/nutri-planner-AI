import React, { useState } from "react";
import { Card, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_NUTRI_PLANS } from "../utils/queries";

//use Mutation to update the title
import { useMutation } from "@apollo/client";
import { UPDATE_NUTRI_PLAN_TITLE } from "../utils/mutations";

const SavedMealPlans = () => {
  //Define state variables for editing the title
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  const { data } = useQuery(QUERY_NUTRI_PLANS);
  console.log(data);
  const nutriPlans = data?.nutriPlans || [];

  const [updateTitle] = useMutation(UPDATE_NUTRI_PLAN_TITLE);

  const handleEditTitle = (nutriPlanId) => {
    setIsEditing(true);
  };

  const handleSaveTitle = async (nutriPlanId) => {
    if (editedTitle.trim() !== "") {
      await updateTitle({
        variables: { nutriPlanId, title: editedTitle },
        refetchQueries: [{ query: QUERY_NUTRI_PLANS }],
      });
      setIsEditing(false);
    }
  };

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
          <h2>
            {isEditing ? (
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
            {isEditing && (
            <IconButton onClick={() => handleSaveTitle(nutriPlan._id)}>
              Save
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
