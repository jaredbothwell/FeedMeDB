CREATE OR ALTER PROCEDURE Data.GetAvgRatingByRecipeID
@RecipeID INT
AS
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
WHERE UR.RecipeID = @RecipeID
GROUP BY R.RecipeID, R.Name

--EXECUTE Data.GetAvgRatingByRecipeID 1