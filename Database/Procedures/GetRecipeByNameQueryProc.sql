CREATE OR ALTER PROCEDURE GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT R.RecipeID, R.Name, R.PrepTime, R.Directions, R.Difficulty, R.CreatedUserID, R.CreatedOn, R.ModifiedOn, R.RemovedOn
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'


--EXECUTE GetRecipeByNameQuery 'Cookie'