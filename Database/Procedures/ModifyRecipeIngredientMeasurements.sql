-- This procedure takes in the recipe ingredient ID as well as a new Measurement Unit and Quantity so that a recipe's ingredients can be updated.
CREATE OR ALTER PROCEDURE Data.ModifyRecipeIngredientMeasurements
@RecipeIngredientID INT,
@MeasurementUnitName NVARCHAR(20),
@MeasurementQuantity INT
AS
BEGIN
UPDATE Data.RecipeIngredient
SET
MeasurementUnitID = (
    SELECT M.MeasurementUnitID
    FROM Data.MeasurementUnit M
    WHERE M.Name = @MeasurementUnitName),
MeasurementQuantity = @MeasurementQuantity,
ModifiedOn = SYSDATETIMEOFFSET()
WHERE RecipeIngredientID = @RecipeIngredientID

END
GO
