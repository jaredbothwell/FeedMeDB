-- This procedure gets the average ratings by a created user ID. This is an aggregating query. It groups by the created userID and their username.
CREATE OR ALTER PROCEDURE Data.GetAvgRatingsByUserID AS
SELECT U.UserName, AVG(Rating) as AverageRating, COUNT(Rating) as TotalRatings
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on UR.RecipeID = R.RecipeID
    INNER JOIN Data.[User] U on U.UserID = R.CreatedUserID
WHERE UR.Rating IS NOT NULL
GROUP BY R.CreatedUserID, U.UserName
HAVING COUNT(R.RecipeID) >= 3
END
GO
