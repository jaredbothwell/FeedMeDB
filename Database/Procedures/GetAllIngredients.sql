CREATE PROCEDURE Data.GetAllIngredients
AS
SELECT *
FROM Data.Ingredient
WHERE RemovedOn IS NULL
GO
--Execute Data.GetAllIngredients