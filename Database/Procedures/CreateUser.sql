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