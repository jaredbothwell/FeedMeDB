CREATE OR ALTER PROCEDURE Data.GetAvgRatingsByUserID
@UserID INT
AS
SELECT R.CreatedUserID,R.Name,AVG(Rating) as AverageRating, COUNT(Rating) as TotalRatings
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on UR.RecipeID = R.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.Rating IS NOT NULL
GROUP BY R.CreatedUserID, R.Name
HAVING COUNT(R.RecipeID) >= 5

--EXECUTE Data.GetAvgRatingsByUserID 1