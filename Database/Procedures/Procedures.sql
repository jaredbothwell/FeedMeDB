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
GO
-- This procedure takes in a username and a password and creates a new user in the database. It returns the user's id.
CREATE OR ALTER PROCEDURE Data.CreateUser
@userName NVARCHAR(20),
@passwordHash NVARCHAR(256)
AS

BEGIN

INSERT INTO Data.[User] (UserName, PasswordHash) 
    VALUES (@userName, @passwordHash)

SELECT U.UserID, U.UserName, U.PasswordHash, U.CreatedOn, U.ModifiedOn, U.RemovedOn 
FROM Data.[User] U 
WHERE U.UserName = @userName
    AND U.RemovedOn IS NULL

END
GO
-- This procedure creates or updates a user rating or bookmark made by a specific user.
CREATE OR ALTER PROCEDURE Data.CreateOrUpdateUserRecipe
@UserID int,
@RecipeID int,
@IsBookmarked bit,
@Rating int
AS
BEGIN

WITH SourceCTE(UserID, RecipeID, IsBookmarked, Rating) AS
(
    SELECT @UserID, @RecipeID, @IsBookmarked, @Rating
)
MERGE Data.UserRecipe as UR
USING SourceCTE as S 
ON S.UserID = UR.UserID AND S.RecipeID = UR.RecipeID
WHEN NOT MATCHED THEN
INSERT (UserID, RecipeID, IsBookmarked, Rating)
    VALUES (@UserID, @RecipeID, @IsBookmarked, @Rating) 
WHEN MATCHED THEN 
UPDATE SET
    IsBookmarked = @IsBookmarked,
    Rating = @Rating,
    ModifiedOn = SYSDATETIMEOFFSET();

END
GO
-- This procedure removes a recipe ingredient from the RecipeIngredient table. This is to disassociate the ingredient from a recipe.
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
-- This procedure updates a recipe's information such as the name, prep time, difficulty, and instructions.
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
-- This procedure updates a recipe ingredient by changing its measurement unit and quantity.
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
GO
-- This procedure updates the user name for a specific user in our database.
CREATE OR ALTER PROCEDURE Data.EditUser 
    @UserID INT,
    @NewUserName NVARCHAR(128)
AS
UPDATE Data.[User] 
SET
ModifiedOn = SYSDATETIMEOFFSET(),
UserName = @NewUserName
WHERE UserID = @UserID
GO
-- This procedure gets all ingredients currently active in the database.
CREATE OR ALTER PROCEDURE Data.GetAllIngredients
AS
SELECT 
    I.IngredientID, 
    I.Name as IngredientName,
    I.CreatedOn
FROM Data.Ingredient I
ORDER BY I.Name ASC
GO
-- This procedure fetches all active recipes in the database. It is set to page 50 results at a time.
CREATE OR ALTER PROCEDURE Data.GetAllRecipes
@page int
AS
BEGIN

SELECT *
FROM Data.Recipe R
WHERE RemovedOn IS NULL
ORDER BY R.Name ASC
OFFSET (@page-1) * 50 ROWS 
FETCH NEXT 50 ROWS ONLY

END
GO
-- This procedure gets all users currently active in the database.
CREATE OR ALTER PROCEDURE Data.GetAllUsers
AS
SELECT * 
FROM Data.[User] U
WHERE U.RemovedOn is NULL
GO
-- This procedure gets the top recipes by finding those with the highest average rating. 
-- It fetches the top 10 specifically and is one of our aggregating queries.
CREATE OR ALTER PROCEDURE Data.GetTopRecipes
AS
BEGIN
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating, U.UserName
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
INNER JOIN Data.[User] U on R.CreatedUserID = U.UserID
GROUP BY R.RecipeID, R.Name, U.UserName
ORDER BY AverageRating DESC, R.Name ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY

END

GO
-- This procedure gets the average rating by a recipe ID. This is an aggregating query and groups by the recipeID, recipe name, and username.
CREATE OR ALTER PROCEDURE Data.GetAvgRatingByRecipeID
@RecipeID int
AS
BEGIN
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating, U.UserName
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
    INNER JOIN Data.[User] U on R.CreatedUserID = U.UserID
WHERE UR.RecipeID = @RecipeID
GROUP BY R.RecipeID, R.Name, U.UserName

END
GO
-- This procedure gets the average ratings by a created user ID. This is an aggregating query. It groups by the created userID and their username.
CREATE OR ALTER PROCEDURE Data.GetAvgRatingsByUserID AS
BEGIN
SELECT U.UserName, AVG(Rating) as AverageRating, COUNT(Rating) as TotalRatings
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on UR.RecipeID = R.RecipeID
    INNER JOIN Data.[User] U on U.UserID = R.CreatedUserID
WHERE UR.Rating IS NOT NULL
GROUP BY R.CreatedUserID, U.UserName
HAVING COUNT(R.RecipeID) >= 3
END
GO
-- This query is one of our aggregating queries that gets the most active users by their total interactions (bookmarks and ratings).
CREATE OR ALTER PROCEDURE Data.GetMostActiveUsers
AS
BEGIN

SELECT U.UserName, COUNT(*) as CountRecipesInteractedWith
FROM Data.UserRecipe UR
    INNER JOIN Data.[User] U on U.UserID = UR.UserID
WHERE UR.RemovedOn is NULL
    AND U.RemovedOn is NULL
GROUP BY U.UserName
ORDER BY CountRecipesInteractedWith DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY

END
GO
-- This procedure gets all non-removed recipes by a specific UserID who created them.
CREATE OR ALTER PROCEDURE Data.GetRecipeByCreatedUserID
@UserID INT
AS
BEGIN
SELECT R.RecipeID, R.CreatedUserID, R.Name, R.PrepTime, R.Difficulty, R.Directions, R.CreatedOn, R.ModifiedOn, R.RemovedOn
FROM Data.Recipe R
WHERE R.CreatedUserID = @UserID AND R.RemovedOn IS NULL
END
GO
-- This procedure gets recipes specifically by content typed into the search box on our website. 
-- It is called when there is not a list of preferred ingredients.
CREATE OR ALTER PROCEDURE Data.GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
BEGIN
SELECT *
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC
END
GO
-- This procedure gets a recipe by a query on the search page as well as a list of ingredients. 
-- It parses both the list of ingredients and keywords from the query to produce results related to them.
CREATE OR ALTER PROCEDURE GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(2048),
@UserQuery NVARCHAR(256)
AS
BEGIN
SELECT R.RecipeID, R.Name, R.PrepTime, R.Directions, R.Difficulty, R.CreatedUserID, R.CreatedOn, R.ModifiedOn, R.RemovedOn 
FROM Data.Recipe R
    INNER JOIN
    (
        SELECT DISTINCT RI.RecipeID
        FROM Data.RecipeIngredient RI
        WHERE NOT EXISTS 
        (
            SELECT I.IngredientID
            FROM STRING_SPLIT(@IngredientList, ',')
                INNER JOIN Data.Ingredient I on I.Name = VALUE
            WHERE I.IngredientID NOT IN 
            (
                SELECT DISTINCT RIcopy.IngredientID
                FROM Data.RecipeIngredient RIcopy
                WHERE RIcopy.RecipeID=RI.RecipeID
            )
        )
    ) AS D (RecipeID) on D.RecipeID = R.RecipeID
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC
END
GO
-- This procedure gets the ingredients related to a recipe in the Data.RecipeIngredient table.
CREATE OR ALTER PROCEDURE Data.GetRecipeIngredients
@RecipeID int
AS
BEGIN

    select 
        I.IngredientID, 
        I.Name as IngredientName,
        RI.MeasurementQuantity,
        RI.MeasurementUnitID,
        MU.Name as MeasurementUnitName
    from Data.RecipeIngredient RI
        inner join  Data.Ingredient I on I.IngredientID = RI.IngredientID 
        inner join Data.MeasurementUnit MU on MU.MeasurementUnitID = RI.MeasurementUnitID
    where RI.RecipeID = @RecipeID
        and RI.RemovedOn is NULL

END
GO
-- This query gets the recipes that a specific user has bookmarked.
CREATE OR ALTER PROCEDURE Data.GetBookmarkedRecipes
@UserID INT
AS
BEGIN

SELECT
    UR.UserRecipeID,
    UR.UserID,
    UR.RecipeID,
    UR.Rating,
    UR.IsBookmarked,
    UR.CreatedOn,
    UR.ModifiedOn,
    UR.RemovedOn
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE UR.UserID = @UserID 
    and R.RemovedOn IS NULL 
    and UR.RemovedOn IS NULL
ORDER BY R.CreatedOn ASC
END
GO
-- This procedure gets the total bookmarks for a recipe created by a specific user. This is an aggregating query. It groups by the created userID.
CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksByCreatedUser
@UserID INT
AS
SELECT R.CreatedUserID, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.IsBookmarked = 1
GROUP BY R.CreatedUserID
GO
-- This procedure returns the total bookmarks for a RecipeID and groups by their RecipeID & Name. This is an aggregating query.
CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksForRecipe
@RecipeID INT
AS
SELECT R.RecipeID,R.Name, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.RecipeID = @RecipeID AND UR.IsBookmarked = 1
GROUP BY R.RecipeID, R.Name
GO
-- This procedure gets a user by their unique ID and returns all information related to that user.
CREATE OR ALTER PROCEDURE Data.GetUserByID
@UserID INT
AS
SELECT *
FROM Data.[User]
WHERE UserID = @UserID AND RemovedOn IS NULL
GO
-- This procedure gets a user by their username and returns all information related to that user.
CREATE OR ALTER PROCEDURE Data.GetUserByName
@userName NVARCHAR(20)
AS
BEGIN

SELECT U.UserID, U.UserName, U.PasswordHash, U.CreatedOn, U.ModifiedOn, U.RemovedOn 
FROM Data.[User] U 
WHERE U.UserName = @userName
    AND U.RemovedOn IS NULL


END
GO
-- This procedure is similar to InsertRecipeIngredientWithID, however, it takes in a RecipeName instead of Recipe ID.
-- It will search for a recipe Name and insert the related recipe ingredient into the RecipeIngredient table.
CREATE OR ALTER PROCEDURE Data.InsertRecipeIngredient 
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
-- This procedure inserts a recipe ingredient into the Data.RecipeIngredient table so that it will be attached to the recipe ID. 
-- It takes in a RecipeID, Ingredientname, MeasurementUnitName, and MeasurementQuantity to attach to the recipe.
CREATE OR ALTER PROCEDURE Data.InsertRecipeIngredientWithID
    @RecipeID INT, 
    @IngredientName nvarchar(60), 
    @MeasurementUnitName nvarchar(10), 
    @MeasurementQuantity numeric(5,3)
AS
INSERT INTO Data.RecipeIngredient
    (RecipeID,IngredientID,MeasurementUnitID,MeasurementQuantity)
SELECT RecipeID, I.IngredientID, M.MeasureMentUnitID,MeasurementQuantity
FROM
    (
    VALUES
        (@RecipeID, @IngredientName, @MeasurementUnitName,@MeasurementQuantity)
    ) Derived(RecipeID, IngredientName, [MeasurementUnitName], MeasurementQuantity)
    INNER JOIN Data.Ingredient I on I.Name = Derived.IngredientName
    INNER JOIN Data.MeasurementUnit M on M.Name = Derived.MeasurementUnitName

GO
-- This procedure takes in the recipe ingredient ID as well as a new Measurement Unit and Quantity so that a recipe's ingredients can be updated.
CREATE OR ALTER PROCEDURE Data.ModifyRecipeIngredientMeasurements
@RecipeIngredientID INT,
@MeasurementUnitName NVARCHAR(20),
@MeasurementQuantity INT
AS
BEGIN
UPDATE Data.RecipeIngredient
SET
MeasurementUnitID = (
    SELECT M.MeasurementUnitID
    FROM Data.MeasurementUnit M
    WHERE M.Name = @MeasurementUnitName),
MeasurementQuantity = @MeasurementQuantity,
ModifiedOn = SYSDATETIMEOFFSET()
WHERE RecipeIngredientID = @RecipeIngredientID

END
GO
-- This procedure removes a recipe by taking in the recipe's id and setting RemovedOn to the current system time
-- This is a soft delete.
CREATE OR ALTER PROCEDURE Data.RemoveRecipe
    @id int
AS

UPDATE Data.Recipe
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE RecipeID = @id
GO
-- This procedure removes a user from the database and takes in the user's id.
CREATE OR ALTER PROCEDURE Data.RemoveUser 
    @UserID INT
AS
UPDATE Data.[User] 
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE UserID = @UserID
GO
