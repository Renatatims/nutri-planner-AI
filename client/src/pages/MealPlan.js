import React, { useState } from "react";
import { Card, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Auth from "../utils/auth";
import DeleteIcon from "@mui/icons-material/Delete";

// Import Icons
import carbsIcon from "../assets/icons/breadIcon.png";
import proteinIcon from "../assets/icons/proteinIcon.png";
import fatIcon from "../assets/icons/fatIcon.png";
import caloriesIcon from "../assets/icons/caloriesIcon.png";

//use Query Hook
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_NUTRI_PLANS } from "../utils/queries";

//use Mutation to update the title
import { useMutation } from "@apollo/client";
import { UPDATE_NUTRI_PLAN_TITLE } from "../utils/mutations";

// Mutation to delete a meal plan
import { DELETE_NUTRI_PLAN } from "../utils/mutations";

const SavedMealPlans = () => {
  //Define state variables for editing the title
  const [isEditing, setIsEditing] = useState({});
  const [editedTitle, setEditedTitle] = useState("");

  //Manage the expanded state of the meal plans
  const [expandedMealPlan, setExpandedMealPlan] = useState(null);

  //Delete Meal Plan mutation
  const [deleteNutriPlan] = useMutation(DELETE_NUTRI_PLAN, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  // QUERY_NUTRI_PLANS query to get the list of meal plans from the database
  const { data } = useQuery(QUERY_NUTRI_PLANS);
  console.log(data);
  const nutriPlans = data?.nutriPlans || [];

  // UPDATE_NUTRI_PLAN_TITLE mutation - to update a meal plan title
  const [updateTitle] = useMutation(UPDATE_NUTRI_PLAN_TITLE, {
    refetchQueries: [{ query: QUERY_NUTRI_PLANS }],
  });

  // handleEditTitle function - to handle the edit title button click event
  const handleEditTitle = (nutriPlanId) => {
    // Set the editing state of the title with the given nutriPlanId to true
    setIsEditing((prevEditing) => ({ ...prevEditing, [nutriPlanId]: true }));
  };

  //handleSaveTitle function - save title button click event
  const handleSaveTitle = async (nutriPlanId) => {
    try {
      await updateTitle({
        variables: {
          nutriPlanId,
          title: editedTitle,
        },
      });
      setIsEditing((prev) => ({ ...prev, [nutriPlanId]: false }));
      setEditedTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  //handleTitleChange function -  handle the input field's change event
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  // Function to toggle the meal plan visbility
  const toggleMealPlan = (nutriPlanId) => {
    if (expandedMealPlan === nutriPlanId) {
      setExpandedMealPlan(null);
    } else {
      setExpandedMealPlan(nutriPlanId);
    }
  };

  // Delete meal Plan
  const handleDeleteNutriPlan = async (nutriPlanId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await deleteNutriPlan({
        variables: { nutriPlanId },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
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
          {nutriPlan.meals &&
            nutriPlan.meals.split("\n").map((meal, index, arr) => {
              const [mealInfo, mealDetails] = meal.split(":");
              const isHeader = [
                "Breakfast",
                "Snack",
                "Lunch",
                "Dinner",
                "Total Daily Macros",
              ].includes(mealInfo.trim());
              if (
                expandedMealPlan !== nutriPlan._id &&
                arr.length - index > 5
              ) {
                return null; // preview meal plan - no more than 3 lines
              }

              const macroRegex = /carbs|protein|fat|calories/gi; // a regex that matches any of the macro names
              const macroMatches = mealInfo.match(macroRegex); // an array of any macro names found in mealInfo

              // Get the appropriate icon for the macro
              let icon;
              if (macroMatches) {
                macroMatches.forEach((macro) => {
                  switch (macro.trim().toLowerCase()) {
                    case "carbs":
                      icon = carbsIcon;
                      break;
                    case "protein":
                      icon = proteinIcon;
                      break;
                    case "fat":
                      icon = fatIcon;
                      break;
                    case "calories":
                      icon = caloriesIcon;
                      break;
                    default:
                      break;
                  }
                });
              }

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
                      {icon && (
                        <img
                          src={icon}
                          alt={`${mealInfo} icon`}
                          width={35}
                          height={35}
                        />
                      )} {mealInfo}: {mealDetails}
                    </p>
                  )}
                </div>
              );
            })}
          <IconButton onClick={() => toggleMealPlan(nutriPlan._id)}>
            <MoreHorizIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteNutriPlan(nutriPlan._id)}>
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
    </>
  );
};

export default SavedMealPlans;
