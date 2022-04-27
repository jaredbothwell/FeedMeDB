CREATE OR ALTER PROCEDURE Data.GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT *
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC

--EXECUTE GetRecipeByNameQuery 'Cookie'