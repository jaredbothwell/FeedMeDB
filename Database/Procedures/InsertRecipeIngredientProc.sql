-- This procedure is similar to InsertRecipeIngredientWithID, however, it takes in a RecipeName instead of Recipe ID.
-- It will search for a recipe Name and insert the related recipe ingredient into the RecipeIngredient table.
CREATE OR ALTER PROCEDURE Data.InsertRecipeIngredient 
    @RecipeName nvarchar(30), 
    @IngredientName nvarchar(60), 
    @MeasurementUnitName nvarchar(10), 
    @MeasurementQuantity int
AS
INSERT INTO Data.RecipeIngredient
    (RecipeID,IngredientID,MeasurementUnitID,MeasurementQuantity)
SELECT R.RecipeID, I.IngredientID, M.MeasureMentUnitID,MeasurementQuantity
FROM
    (
    VALUES
        (@RecipeName, @IngredientName, @MeasurementUnitName,@MeasurementQuantity)
    ) Derived([RecipeName], IngredientName, [MeasurementUnitName], MeasurementQuantity)
    INNER JOIN Data.Recipe R on R.Name = Derived.RecipeName
    INNER JOIN Data.Ingredient I on I.Name = Derived.IngredientName
    INNER JOIN Data.MeasurementUnit M on M.Name = Derived.MeasurementUnitName

GO
