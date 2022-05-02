-- This procedure takes in an ingredient name and removes it from the Ingredients table. 
CREATE PROCEDURE Data.RemoveIngredient 
    @IngredientName nvarchar(128)
AS
UPDATE Data.Ingredient 
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE IngredientID = (
SELECT I.IngredientID
FROM
    (
    VALUES
        (@IngredientName)
    ) Derived(IngredientName)
    INNER JOIN Data.Ingredient I on I.Name = Derived.IngredientName
)
GO
