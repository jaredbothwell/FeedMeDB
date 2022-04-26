CREATE OR ALTER PROCEDURE Data.GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT DISTINCT(R.RecipeID),R.Name,R.CreatedUserID,R.Difficulty,R.Directions,R.PrepTime,R.RemovedOn
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'

--EXECUTE GetRecipeByNameQuery 'Cookie'