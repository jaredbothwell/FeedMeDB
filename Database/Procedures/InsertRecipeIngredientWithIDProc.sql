-- This procedure inserts a recipe ingredient into the Data.RecipeIngredient table so that it will be attached to the recipe ID. 
-- It takes in a RecipeID, Ingredientname, MeasurementUnitName, and MeasurementQuantity to attach to the recipe.
CREATE OR ALTER PROCEDURE Data.InsertRecipeIngredientWithID
    @RecipeID INT, 
    @IngredientName nvarchar(60), 
    @MeasurementUnitName nvarchar(10), 
    @MeasurementQuantity numeric(5,3)
AS
INSERT INTO Data.RecipeIngredient
    (RecipeID,IngredientID,MeasurementUnitID,MeasurementQuantity)
SELECT RecipeID, I.IngredientID, M.MeasureMentUnitID,MeasurementQuantity
FROM
    (
    VALUES
        (@RecipeID, @IngredientName, @MeasurementUnitName,@MeasurementQuantity)
    ) Derived(RecipeID, IngredientName, [MeasurementUnitName], MeasurementQuantity)
    INNER JOIN Data.Ingredient I on I.Name = Derived.IngredientName
    INNER JOIN Data.MeasurementUnit M on M.Name = Derived.MeasurementUnitName

GO
