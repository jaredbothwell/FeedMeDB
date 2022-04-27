CREATE OR ALTER PROCEDURE Data.GetAllIngredients
AS
SELECT 
    I.IngredientID, 
    I.Name as IngredientName,
    I.CreatedOn
FROM Data.Ingredient I
GO
--Execute Data.GetAllIngredients
