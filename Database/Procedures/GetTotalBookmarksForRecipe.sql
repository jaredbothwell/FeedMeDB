-- This procedure returns the total bookmarks for a RecipeID and groups by their RecipeID & Name. This is an aggregating query.
CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksForRecipe
@RecipeID INT
AS
SELECT R.RecipeID,R.Name, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.RecipeID = @RecipeID AND UR.IsBookmarked = 1
GROUP BY R.RecipeID, R.Name
GO
