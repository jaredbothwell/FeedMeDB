-- This procedure creates or updates a user rating or bookmark made by a specific user.
CREATE OR ALTER PROCEDURE Data.CreateOrUpdateUserRecipe
@UserID int,
@RecipeID int,
@IsBookmarked bit,
@Rating int
AS
BEGIN

WITH SourceCTE(UserID, RecipeID, IsBookmarked, Rating) AS
(
    SELECT @UserID, @RecipeID, @IsBookmarked, @Rating
)
MERGE Data.UserRecipe as UR
USING SourceCTE as S 
ON S.UserID = UR.UserID AND S.RecipeID = UR.RecipeID
WHEN NOT MATCHED THEN
INSERT (UserID, RecipeID, IsBookmarked, Rating)
    VALUES (@UserID, @RecipeID, @IsBookmarked, @Rating) 
WHEN MATCHED THEN 
UPDATE SET
    IsBookmarked = @IsBookmarked,
    Rating = @Rating,
    ModifiedOn = SYSDATETIMEOFFSET();

END
GO
