-- RESET ENTIRE DB
DROP TABLE IF EXISTS Data.MeasurementUnit
DROP TABLE IF EXISTS Data.Ingredient
DROP TABLE IF EXISTS Data.UserRecipe
DROP TABLE IF EXISTS Data.Recipe
DROP TABLE IF EXISTS Data.RecipeIngredient
DROP TABLE IF EXISTS Data.[User]

GO

CREATE TABLE Data.[User]
(
    UserID int primary key identity(0,1),
    UserName varchar(20) not null unique,
    PasswordHash varbinary(256) not null,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

GO

CREATE TABLE Data.MeasurementUnit(
    MeasurementUnitID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] VARCHAR(32) NOT NULL UNIQUE,
    IsRemoved bit default 0 NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)

GO

CREATE TABLE Data.Ingredient(
    IngredientID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(32) NOT NULL UNIQUE,
    IsRemoved bit default 0 NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

GO

CREATE TABLE Data.Recipe(
    RecipeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CreatedUserID INT FOREIGN KEY REFERENCES Data.[User](UserID),
    [Name] VARCHAR(512) NOT NULL,
    PrepTime INT,
    Difficulty VARCHAR(32) NOT NULL,
    Directions VARCHAR(2048) NOT NULL,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)

GO

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

GO

CREATE TABLE Data.UserRecipe(
    UserRecipeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Data.[User](UserID) NOT NULL,
    RecipeID INT FOREIGN KEY REFERENCES Data.Recipe(RecipeID) NOT NULL,
    IsBookmarked BIT DEFAULT 0 NOT NULL,
    Rating INT,
    IsRemoved bit default 0 NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)
