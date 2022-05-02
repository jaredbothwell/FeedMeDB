-- This procedure fetches all active recipes in the database. It is set to page 50 results at a time.
CREATE OR ALTER PROCEDURE Data.GetAllRecipes
@page int
AS
BEGIN

SELECT *
FROM Data.Recipe R
WHERE RemovedOn IS NULL
ORDER BY R.Name ASC
OFFSET (@page-1) * 50 ROWS 
FETCH NEXT 50 ROWS ONLY

END
GO
