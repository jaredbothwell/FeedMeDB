CREATE OR ALTER PROCEDURE Data.GetRecipeByCreatedUserID
@UserID INT
AS
SELECT R.RecipeID, R.CreatedUserID, R.Name, R.PrepTime, R.Difficulty, R.Directions, R.CreatedOn, R.ModifiedOn, R.RemovedOn
FROM Data.Recipe R
WHERE R.CreatedUserID = @UserID AND R.RemovedOn IS NULL

--EXECUTE Data.GetRecipeByUserID 1