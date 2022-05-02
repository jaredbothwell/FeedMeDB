CREATE OR ALTER PROCEDURE Data.GetBookmarkedRecipes
@UserID INT
AS
BEGIN

SELECT
    UR.UserRecipeID,
    UR.UserID,
    UR.RecipeID,
    UR.Rating,
    UR.IsBookmarked,
    UR.CreatedOn,
    UR.ModifiedOn,
    UR.RemovedOn
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE UR.UserID = @UserID 
    and R.RemovedOn IS NULL 
    and UR.RemovedOn IS NULL
ORDER BY R.CreatedOn ASC


END