CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksByCreatedUser
@UserID INT
AS
SELECT R.CreatedUserID, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.IsBookmarked = 1
GROUP BY R.CreatedUserID

--Execute Data.GetTotalBookmarksByCreatedUser 1