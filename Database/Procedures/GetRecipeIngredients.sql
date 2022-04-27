CREATE OR ALTER PROCEDURE Data.GetRecipeIngredients
@RecipeID int
AS
BEGIN

    select 
        I.IngredientID, 
        I.Name as IngredientName,
        RI.MeasurementQuantity,
        RI.MeasurementUnitID,
        MU.Name as MeasurementUnitName
    from Data.RecipeIngredient RI
        inner join  Data.Ingredient I on I.IngredientID = RI.IngredientID 
        inner join Data.MeasurementUnit MU on MU.MeasurementUnitID = RI.MeasurementUnitID
    where RI.RecipeID = @RecipeID
        and RI.RemovedOn is NULL

END