CREATE OR ALTER PROCEDURE Data.RemoveRecipeIngredient
@ingredientID int,
@recipeID int
AS

BEGIN

UPDATE Data.RecipeIngredient
SET
    RemovedOn = SYSDATETIMEOFFSET()
WHERE RecipeID = @recipeID and IngredientID = @ingredientID

END

GO

CREATE OR ALTER PROCEDURE Data.UpdateRecipe
@recipeID int,
@recipeName NVARCHAR(64),
@prepTime int,
@difficulty int,
@directions NVARCHAR(2048)
AS

BEGIN

UPDATE Data.Recipe
SET
    [Name] = @recipeName,
    PrepTime = @prepTime,
    Difficulty = @difficulty,
    Directions = @directions,
    ModifiedOn = SYSDATETIMEOFFSET()
WHERE RecipeID = @recipeID

END

GO

CREATE OR ALTER PROCEDURE Data.UpdateRecipeIngredient
@recipeID int,
@ingredientName VARCHAR(64),
@quantity numeric(5,3),
@unitID int
AS
BEGIN

INSERT INTO Data.Ingredient([Name])
SELECT @ingredientName
WHERE NOT EXISTS (
    SELECT * FROM Data.Ingredient I WHERE  I.Name = @ingredientName
)

UPDATE Data.RecipeIngredient
SET
    ModifiedOn = SYSDATETIMEOFFSET(),
    MeasurementUnitID = @unitID,
    MeasurementQuantity = @quantity
WHERE EXISTS (
    SELECT *
    FROM Data.RecipeIngredient RI
        INNER JOIN Data.Ingredient I on I.IngredientID = RI.IngredientID
    WHERE  I.Name = @ingredientName AND RI.RecipeID = @recipeID
);

WITH SourceCte(IngredientID, Quantity, UnitID, RecipeID) AS 
(
    SELECT I.IngredientID, @quantity, @unitID, @recipeID
    FROM Data.Ingredient I
    WHERE I.Name = @ingredientName
)
MERGE  Data.RecipeIngredient as Target
USING  SourceCte as Source
ON Source.IngredientID = Target.IngredientID
    AND Source.RecipeID = Target.RecipeID
WHEN NOT MATCHED THEN
    INSERT(IngredientID, MeasurementQuantity, MeasurementUnitID, RecipeID)
        VALUES (Source.IngredientID, Source.Quantity, Source.UnitID, Source.RecipeID)
WHEN MATCHED THEN
    UPDATE SET
        Target.ModifiedOn = SYSDATETIME(),
        Target.MeasurementQuantity = Source.Quantity,
        Target.MeasurementUnitID = Source.UnitID;
    

END