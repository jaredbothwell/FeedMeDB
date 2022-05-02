-- This query is one of our aggregating queries that gets the most active users by their total interactions (bookmarks and ratings).
CREATE OR ALTER PROCEDURE Data.GetMostActiveUsers
AS
BEGIN

SELECT U.UserName, COUNT(*) as CountRecipesInteractedWith
FROM Data.UserRecipe UR
    INNER JOIN Data.[User] U on U.UserID = UR.UserID
WHERE UR.RemovedOn is NULL
    AND U.RemovedOn is NULL
GROUP BY U.UserName
ORDER BY CountRecipesInteractedWith DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY

END
GO
