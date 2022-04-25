CREATE PROCEDURE Data.GetAllUsers
AS
SELECT * 
FROM Data.[User] U
WHERE U.RemovedOn is NULL
GO

--EXECUTE Data.GetAllUsers