CREATE OR ALTER PROCEDURE Data.GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(MAX),
@UserQuery NVARCHAR(256)
AS
SELECT DISTINCT(REC.RecipeID),REC.Name,REC.CreatedUserID,REC.Difficulty,REC.Directions,REC.PrepTime,REC.RemovedOn
FROM Data.RecipeIngredient R
INNER JOIN Data.Ingredient I on I.IngredientID = R.IngredientID
INNER JOIN Data.Recipe REC on REC.RecipeID = R.RecipeID
WHERE R.IngredientID
IN
(SELECT value FROM STRING_SPLIT(@IngredientList, ','))
AND REC.Name LIKE '%' + @UserQuery + '%'

--EXECUTE Data.GetRecipeByQueryAndIngredient '1,2,3',''