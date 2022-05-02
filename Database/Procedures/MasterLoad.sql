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
CREATE OR ALTER PROCEDURE Data.CreateUser
@username NVARCHAR(20),
@passwordHash NVARCHAR(256)
AS

BEGIN

INSERT INTO Data.[User] (UserName, PasswordHash) 
    VALUES (@username, @passwordHash)

SELECT U.UserID, U.UserName, U.PasswordHash, U.CreatedOn, U.ModifiedOn, U.RemovedOn 
FROM Data.[User] U 
WHERE U.UserName = @username
    AND U.RemovedOn IS NULL

END
GO
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

UPDATE Data.RecipeIngredient
SET
    ModifiedOn = SYSDATETIMEOFFSET(),
    MeasurementUnitID = @unitID,
    MeasurementQuantity = @quantity
WHERE EXISTS (
    SELECT *
    FROM Data.RecipeIngredient RI
        INNER JOIN Data.Ingredient I on I.IngredientID = RI.IngredientID
    WHERE  I.Name = @ingredientName AND RI.RecipeID = @recipeID
);

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

CREATE OR ALTER PROCEDURE Data.GetAllIngredients
AS
SELECT 
    I.IngredientID, 
    I.Name as IngredientName,
    I.CreatedOn
FROM Data.Ingredient I
GO
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
CREATE OR ALTER PROCEDURE Data.GetAllUsers
AS
SELECT * 
FROM Data.[User] U
WHERE U.RemovedOn is NULL
GO

CREATE OR ALTER PROCEDURE Data.GetAvgRatingByRecipeID
@RecipeID INT
AS
SELECT R.RecipeID, R.Name, AVG(Rating) as AverageRating
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R ON R.RecipeID = UR.RecipeID
WHERE UR.RecipeID = @RecipeID
GROUP BY R.RecipeID, R.Name
GO
CREATE OR ALTER PROCEDURE Data.GetAvgRatingsByUserID
@UserID INT
AS
SELECT R.CreatedUserID,R.Name,AVG(Rating) as AverageRating, COUNT(Rating) as TotalRatings
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on UR.RecipeID = R.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.Rating IS NOT NULL
GROUP BY R.CreatedUserID, R.Name
HAVING COUNT(R.RecipeID) >= 5
GO
CREATE OR ALTER PROCEDURE Data.GetRecipeByCreatedUserID
@UserID INT
AS
SELECT R.RecipeID, R.CreatedUserID, R.Name, R.PrepTime, R.Difficulty, R.Directions, R.CreatedOn, R.ModifiedOn, R.RemovedOn
FROM Data.Recipe R
WHERE R.CreatedUserID = @UserID AND R.RemovedOn IS NULL
GO
CREATE OR ALTER PROCEDURE Data.GetRecipeByNameQuery
@UserQuery NVARCHAR(256)
AS
SELECT *
FROM Data.Recipe R
WHERE R.Name LIKE '%' + @UserQuery + '%'
ORDER BY R.Name ASC
GO
CREATE OR ALTER PROCEDURE GetRecipeByQueryAndIngredient
@IngredientList NVARCHAR(2048),
@UserQuery NVARCHAR(256)
AS
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
GO
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
CREATE OR ALTER PROCEDURE Data.GetSavedRecipes
@UserID INT
AS
BEGIN

SELECT
    UR.UserRecipeID,
    UR.UserID,
    UR.RecipeID,
    UR.IsBookmarked,
    UR.Rating,
    UR.CreatedOn,
    UR.ModifiedOn,
    UR.RemovedOn
FROM Data.UserRecipe UR
    INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE UR.UserID = @UserID and R.RemovedOn IS NULL and UR.RemovedOn IS NULL
ORDER BY R.CreatedOn ASC


END
GO
CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksByCreatedUser
@UserID INT
AS
SELECT R.CreatedUserID, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.CreatedUserID = @UserID AND UR.IsBookmarked = 1
GROUP BY R.CreatedUserID
GO

CREATE OR ALTER PROCEDURE Data.GetTotalBookmarksForRecipe
@RecipeID INT
AS
SELECT R.RecipeID,R.Name, COUNT(IsBookmarked) as TotalBookmarks
FROM Data.UserRecipe UR
INNER JOIN Data.Recipe R on R.RecipeID = UR.RecipeID
WHERE R.RecipeID = @RecipeID AND UR.IsBookmarked = 1
GROUP BY R.RecipeID, R.Name
GO
CREATE OR ALTER PROCEDURE Data.GetUserByID
@UserID INT
AS
SELECT *
FROM Data.[User]
WHERE UserID = @UserID AND RemovedOn IS NULL
GO
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

--INSERT INTO Data.[User](UserName,PasswordHash)
--VALUES('System',HASHBYTES('SHA2_256','test'))

--INSERT INTO Data.Recipe (Name, CreatedUserID,PrepTime,Difficulty,Directions)
--VALUES('No-Bake Nut Cookies',0,20,5,'In a heavy 2-quart saucepan, mix brown sugar, nuts, evaporated milk and butter or margarine.\n Stir over medium heat until mixture bubbles all over top.\n Boil and stir 5 minutes more. Take off heat.\n Stir in vanilla and cereal; mix well.\n Using 2 teaspoons, drop and shape into 30 clusters on wax paper.\n Let stand until firm, about 30 minutes.')
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
DROP PROCEDURE IF EXISTS Data.ModifyRecipeIngredientMeasurements 
GO
CREATE PROCEDURE Data.ModifyRecipeIngredientMeasurements
@RecipeIngredientID INT,
@MeasurementUnitName NVARCHAR(20),
@MeasurementQuantity INT
AS
UPDATE Data.RecipeIngredient
SET
MeasurementUnitID = (
    SELECT M.MeasurementUnitID
    FROM Data.MeasurementUnit M
    WHERE M.Name = @MeasurementUnitName),
MeasurementQuantity = @MeasurementQuantity,
ModifiedOn = SYSDATETIMEOFFSET()
WHERE RecipeIngredientID = @RecipeIngredientID
GO


GO
CREATE OR ALTER PROCEDURE Data.RemoveRecipe
    @RecipeName nvarchar(60), 
    @UserName nvarchar(60)
AS

UPDATE Data.Recipe
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE EXISTS (
    SELECT R.RecipeID, U.UserID
    FROM
        (
        VALUES
            (@RecipeName, @UserName)
        ) Derived([RecipeName], UserName)
        INNER JOIN Data.Recipe R on R.Name = Derived.RecipeName
        INNER JOIN Data.[User] U on U.UserName = Derived.UserName 
)


GO
CREATE OR ALTER PROCEDURE Data.RemoveUser 
    @UserID INT
AS
UPDATE Data.[User] 
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE UserID = @UserID
GO

--EXECUTE Data.RemoveUser 1