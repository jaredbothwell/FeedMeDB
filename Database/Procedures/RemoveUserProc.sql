CREATE PROCEDURE Data.RemoveUser 
    @UserID INT
AS
UPDATE Data.[User] 
SET
RemovedOn = SYSDATETIMEOFFSET()
WHERE UserID = @UserID
GO

--EXECUTE Data.RemoveUser 1