CREATE OR ALTER PROCEDURE GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(2048),
@UserQuery NVARCHAR(256)
AS
SELECT R.RecipeID, R.Name, R.PrepTime, R.Directions, R.Difficulty, R.CreatedUserID, R.CreatedOn, R.ModifiedOn, R.RemovedOn 
FROM Data.RecipeIngredient RI
INNER JOIN Data.Ingredient I on I.IngredientID = RI.IngredientID
INNER JOIN Data.Recipe R on R.RecipeID = RI.RecipeID
WHERE RI.IngredientID
IN
(SELECT value FROM STRING_SPLIT(@IngredientList, ','))
AND R.Name LIKE '%' + @UserQuery + '%'