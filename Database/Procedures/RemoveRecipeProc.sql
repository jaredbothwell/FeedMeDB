CREATE OR ALTER PROCEDURE Data.RemoveRecipe
    @id int
AS

UPDATE Data.Recipe
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE RecipeID = @id
GO
