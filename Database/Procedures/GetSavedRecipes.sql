CREATE OR ALTER PROCEDURE Data.GetSavedRecipes
@UserID INT
AS
BEGIN

SELECT
    UR.UserREcipeID,
    UR.UserID,
    UR.RecipeID,
    UR.IsBookmarked,
    UR.Rating,
    UR.CreatedOn,
    UR.ModifiedOn,
    UR.RemovedOn,
    R.CreatedUserID,
    R.Name as RecipeName,
    R.PrepTime,
    R.Difficulty,
    R.Directions
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE UR.UserID = @UserID and R.RemovedOn IS NULL and UR.RemovedOn IS NULL
ORDER BY R.CreatedOn ASC


END