CREATE PROCEDURE Data.InsertRecipeIngredient 
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

--INSERT INTO Data.[User](UserName,PasswordHash)
--VALUES('System',HASHBYTES('SHA2_256','test'))

INSERT INTO Data.Recipe (Name, CreatedUserID,PrepTime,Difficulty,Directions)
VALUES('No-Bake Nut Cookies',0,20,5,'In a heavy 2-quart saucepan, mix brown sugar, nuts, evaporated milk and butter or margarine.\n Stir over medium heat until mixture bubbles all over top.\n Boil and stir 5 minutes more. Take off heat.\n Stir in vanilla and cereal; mix well.\n Using 2 teaspoons, drop and shape into 30 clusters on wax paper.\n Let stand until firm, about 30 minutes.')