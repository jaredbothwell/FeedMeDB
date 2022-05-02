-- This procedure removes a user from the database and takes in the user's id.
CREATE OR ALTER PROCEDURE Data.RemoveUser 
    @UserID INT
AS
UPDATE Data.[User] 
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE UserID = @UserID
GO
