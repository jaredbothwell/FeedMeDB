-- This procedure removes a recipe by taking in the recipe's id and setting RemovedOn to the current system time
-- This is a soft delete.
CREATE OR ALTER PROCEDURE Data.RemoveRecipe
    @id int
AS

UPDATE Data.Recipe
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE RecipeID = @id
GO
