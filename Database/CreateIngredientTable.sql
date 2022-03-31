CREATE TABLE Data.Ingredient(
    IngredientID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(32) NOT NULL UNIQUE,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)