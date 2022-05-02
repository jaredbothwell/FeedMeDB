-- This procedure gets all ingredients currently active in the database.
CREATE OR ALTER PROCEDURE Data.GetAllIngredients
AS
SELECT 
    I.IngredientID, 
    I.Name as IngredientName,
    I.CreatedOn
FROM Data.Ingredient I
ORDER BY I.Name ASC
GO
