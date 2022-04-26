CREATE OR ALTER PROCEDURE GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(MAX),
@UserQuery NVARCHAR(256)
AS
SELECT DISTINCT(R.RecipeID)
FROM Data.RecipeIngredient R
INNER JOIN Data.Ingredient I on I.IngredientID = R.IngredientID
INNER JOIN Data.Recipe REC on REC.RecipeID = R.RecipeID
WHERE R.IngredientID
IN
(SELECT value FROM STRING_SPLIT(@IngredientList, ','))
AND REC.Name LIKE '%' + @UserQuery + '%'

EXECUTE GetRecipeByQueryIngredient '1,2,3',''