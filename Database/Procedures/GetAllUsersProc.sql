-- This procedure gets all users currently active in the database.
CREATE OR ALTER PROCEDURE Data.GetAllUsers
AS
SELECT * 
FROM Data.[User] U
WHERE U.RemovedOn is NULL
GO
