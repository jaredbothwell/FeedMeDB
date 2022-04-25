CREATE OR ALTER PROCEDURE Data.GetRecipeByCreatedUserID
@UserID INT
AS
SELECT R.RecipeID
FROM Data.Recipe R
WHERE R.CreatedUserID = @UserID

--EXECUTE Data.GetRecipeByUserID 1