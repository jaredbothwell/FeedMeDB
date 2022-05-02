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
