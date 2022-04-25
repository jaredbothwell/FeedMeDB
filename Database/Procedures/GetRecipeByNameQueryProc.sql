CREATE OR ALTER PROCEDURE GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT DISTINCT(R.RecipeID)
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'

--EXECUTE GetRecipeByNameQuery 'Cookie'