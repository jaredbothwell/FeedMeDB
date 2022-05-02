-- This procedure gets a user by their unique ID and returns all information related to that user.
CREATE OR ALTER PROCEDURE Data.GetUserByID
@UserID INT
AS
SELECT *
FROM Data.[User]
WHERE UserID = @UserID AND RemovedOn IS NULL
GO
