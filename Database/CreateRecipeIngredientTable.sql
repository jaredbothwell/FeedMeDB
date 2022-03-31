CREATE TABLE Data.RecipeIngredient(
    RecipeIngredientID INT IDENTITY(1,1) PRIMARY KEY,
    RecipeID INT FOREIGN KEY REFERENCES Data.Recipe(RecipeID),
    IngredientID INT FOREIGN KEY REFERENCES Data.Ingredient(IngredientID),
    MeasurementQuantity INT,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
    MeasurementUnitID INT FOREIGN KEY REFERENCES Data.MeasurementUnit(MeasurementUnitID)
)