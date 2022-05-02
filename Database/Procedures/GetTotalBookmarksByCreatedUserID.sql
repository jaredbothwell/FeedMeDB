-- This procedure gets the total bookmarks for a recipe created by a specific user. This is an aggregating query. It groups by the created userID.
CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksByCreatedUser
@UserID INT
AS
SELECT R.CreatedUserID, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.IsBookmarked = 1
GROUP BY R.CreatedUserID
GO
