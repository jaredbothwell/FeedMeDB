CREATE PROCEDURE Data.EditUser 
    @UserID INT,
    @NewUserName NVARCHAR(128)
AS
UPDATE Data.[User] 
SET
ModifiedOn = SYSDATETIMEOFFSET(),
UserName = @NewUserName
WHERE UserID = @UserID
GO