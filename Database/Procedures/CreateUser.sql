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