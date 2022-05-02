-- This procedure gets recipes specifically by content typed into the search box on our website. 
-- It is called when there is not a list of preferred ingredients.
CREATE OR ALTER PROCEDURE Data.GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT *
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC
END
GO
