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
