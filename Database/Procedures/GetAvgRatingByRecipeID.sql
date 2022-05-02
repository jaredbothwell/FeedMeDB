CREATE OR ALTER PROCEDURE Data.GetTopRecipes
AS
BEGIN
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating, U.UserName
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
INNER JOIN Data.[User] U on R.CreatedUserID = U.UserID
GROUP BY R.RecipeID, R.Name, U.UserName
ORDER BY AverageRating DESC, R.Name ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY

END

GO

CREATE OR ALTER PROCEDURE Data.GetAvgRatingByRecipeID
@RecipeID int
AS
BEGIN
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating, U.UserName
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
    INNER JOIN Data.[User] U on R.CreatedUserID = U.UserID
WHERE UR.RecipeID = @RecipeID
GROUP BY R.RecipeID, R.Name, U.UserName

END