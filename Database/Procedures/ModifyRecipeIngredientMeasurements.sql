DROP PROCEDURE IF EXISTS Data.ModifyRecipeIngredientMeasurements 
GO
CREATE PROCEDURE Data.ModifyRecipeIngredientMeasurements
@RecipeIngredientID INT,
@MeasurementUnitName NVARCHAR(20),
@MeasurementQuantity INT
AS
UPDATE Data.RecipeIngredient
SET
MeasurementUnitID = (
    SELECT M.MeasurementUnitID
    FROM Data.MeasurementUnit M
    WHERE M.Name = @MeasurementUnitName),
MeasurementQuantity = @MeasurementQuantity,
ModifiedOn = SYSDATETIMEOFFSET()
WHERE RecipeIngredientID = @RecipeIngredientID


--EXECUTE Data.ModifyRecipeIngredientMeasurements 1,N'oz.',4
