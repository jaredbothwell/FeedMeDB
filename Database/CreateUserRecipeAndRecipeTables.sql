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
