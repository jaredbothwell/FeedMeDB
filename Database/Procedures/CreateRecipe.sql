CREATE OR ALTER PROCEDURE Data.CreateRecipe
@name VARCHAR(512), 
@userID int, 
@prepTime int,
@difficulty int,
@directions VARCHAR(2048)
AS
BEGIN

INSERT INTO Recipe([Name], CreatedUserID, PrepTime, Difficulty, Directions)
VALUES (@name, @userID, @prepTime, @difficulty, @directions)
select SCOPE_IDENTITY() as RecipeID

END
GO

CREATE OR ALTER PROCEDURE Data.AddIngredientToRecipe
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

INSERT INTO Data.RecipeIngredient(IngredientID, MeasurementQuantity, MeasurementUnitID, RecipeID)
SELECT I.IngredientID, @quantity, @unitID, @recipeID
FROM DATA.Ingredient I WHERE I.Name = @ingredientName


END