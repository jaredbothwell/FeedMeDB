CREATE PROCEDURE Data.InsertRecipeIngredientWithID
    @RecipeID INT, 
    @IngredientName nvarchar(60), 
    @MeasurementUnitName nvarchar(10), 
    @MeasurementQuantity int
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