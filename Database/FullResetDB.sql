-- RESET ENTIRE DB
DROP TABLE IF EXISTS Data.RecipeIngredient
DROP TABLE IF EXISTS Data.MeasurementUnit
DROP TABLE IF EXISTS Data.Ingredient
DROP TABLE IF EXISTS Data.UserRecipe
DROP TABLE IF EXISTS Data.Recipe
DROP TABLE IF EXISTS Data.[User]

GO

CREATE TABLE Data.[User]
(
    UserID int primary key identity(1,1),
    UserName varchar(20) not null unique,
    PasswordHash varchar(256) not null,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

INSERT INTO Data.[User](UserName,PasswordHash)
VALUES('feedmeDB','637042e4cd8c8e87c1933126e603f9ed86a1fa92b9502dccbfc5a2eea4ffab1b')

GO

CREATE TABLE Data.MeasurementUnit
(
    MeasurementUnitID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] VARCHAR(32) NOT NULL UNIQUE,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)

GO

CREATE TABLE Data.Ingredient
(
    IngredientID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] NVARCHAR(128) NOT NULL UNIQUE,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

GO

CREATE TABLE Data.Recipe
(
    RecipeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    CreatedUserID INT FOREIGN KEY REFERENCES Data.[User](UserID),
    [Name] VARCHAR(512) NOT NULL,
    PrepTime INT,
    Difficulty VARCHAR(32) NOT NULL,
    Directions VARCHAR(2048) NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)

GO

CREATE TABLE Data.RecipeIngredient
(
    RecipeIngredientID INT IDENTITY(1,1) PRIMARY KEY,
    RecipeID INT FOREIGN KEY REFERENCES Data.Recipe(RecipeID) NOT NULL,
    IngredientID INT FOREIGN KEY REFERENCES Data.Ingredient(IngredientID) NOT NULL,
    MeasurementQuantity NUMERIC(5,3) NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
    MeasurementUnitID INT FOREIGN KEY REFERENCES Data.MeasurementUnit(MeasurementUnitID)
)

GO

CREATE TABLE Data.UserRecipe
(
    UserRecipeID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Data.[User](UserID) NOT NULL,
    RecipeID INT FOREIGN KEY REFERENCES Data.Recipe(RecipeID) NOT NULL,
    IsBookmarked BIT DEFAULT 0 NOT NULL,
    Rating INT,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
    UNIQUE(UserID, RecipeID)
)
