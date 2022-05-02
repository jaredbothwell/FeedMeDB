-- This procedure gets a recipe by a query on the search page as well as a list of ingredients. 
-- It parses both the list of ingredients and keywords from the query to produce results related to them.
CREATE OR ALTER PROCEDURE GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(2048),
@UserQuery NVARCHAR(256)
AS
BEGIN
SELECT R.RecipeID, R.Name, R.PrepTime, R.Directions, R.Difficulty, R.CreatedUserID, R.CreatedOn, R.ModifiedOn, R.RemovedOn 
FROM Data.Recipe R
    INNER JOIN
    (
        SELECT DISTINCT RI.RecipeID
        FROM Data.RecipeIngredient RI
        WHERE NOT EXISTS 
        (
            SELECT I.IngredientID
            FROM STRING_SPLIT(@IngredientList, ',')
                INNER JOIN Data.Ingredient I on I.Name = VALUE
            WHERE I.IngredientID NOT IN 
            (
                SELECT DISTINCT RIcopy.IngredientID
                FROM Data.RecipeIngredient RIcopy
                WHERE RIcopy.RecipeID=RI.RecipeID
            )
        )
    ) AS D (RecipeID) on D.RecipeID = R.RecipeID
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC
END
GO
