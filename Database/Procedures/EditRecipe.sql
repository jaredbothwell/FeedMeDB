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
declare @ingredientID int
select @ingredientID = I.IngredientID
from Data.Ingredient I
where I.Name = @ingredientName

UPDATE Data.RecipeIngredient
SET
    ModifiedOn = SYSDATETIMEOFFSET(),
    MeasurementUnitID = @unitID,
    MeasurementQuantity = @quantity
WHERE IngredientID = @ingredientID and RecipeID = @recipeID;

WITH SourceCte(IngredientID, Quantity, UnitID, RecipeID) AS 
(
    SELECT I.IngredientID, @quantity, @unitID, @recipeID
    FROM Data.Ingredient I
    WHERE I.Name = @ingredientName
)
MERGE  Data.RecipeIngredient as T
USING  SourceCte as Source
ON Source.IngredientID = T.IngredientID
    AND Source.RecipeID = T.RecipeID
WHEN NOT MATCHED THEN
    INSERT(IngredientID, MeasurementQuantity, MeasurementUnitID, RecipeID)
        VALUES (Source.IngredientID, Source.Quantity, Source.UnitID, Source.RecipeID)
WHEN MATCHED THEN
    UPDATE SET
        T.ModifiedOn = SYSDATETIME(),
        T.MeasurementQuantity = Source.Quantity,
        T.MeasurementUnitID = Source.UnitID,
        T.RemovedOn = NULL;


END