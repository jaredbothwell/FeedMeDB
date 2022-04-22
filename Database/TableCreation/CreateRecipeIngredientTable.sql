CREATE TABLE Data.RecipeIngredient(
    RecipeIngredientID INT IDENTITY(1,1) PRIMARY KEY,
    RecipeID INT FOREIGN KEY REFERENCES Data.Recipe(RecipeID) NOT NULL,
    IngredientID INT FOREIGN KEY REFERENCES Data.Ingredient(IngredientID) NOT NULL,
    MeasurementQuantity INT NOT NULL,
    IsRemoved bit default 0 NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
    MeasurementUnitID INT FOREIGN KEY REFERENCES Data.MeasurementUnit(MeasurementUnitID)
)