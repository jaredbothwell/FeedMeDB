DROP PROCEDURE IF EXISTS Data.RemoveRecipe;
GO
CREATE PROCEDURE Data.RemoveRecipe
    @RecipeName nvarchar(60), 
    @UserName nvarchar(60)
AS

UPDATE Data.Recipe
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE EXISTS (
    SELECT R.RecipeID, U.UserID
    FROM
        (
        VALUES
            (@RecipeName, @UserName)
        ) Derived([RecipeName], UserName)
        INNER JOIN Data.Recipe R on R.Name = Derived.RecipeName
        INNER JOIN Data.[User] U on U.UserName = Derived.UserName 
)


GO
