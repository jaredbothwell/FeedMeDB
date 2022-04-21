CREATE TABLE Data.MeasurementUnit(
    MeasurementUnitID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] VARCHAR(32) NOT NULL UNIQUE,
    IsRemoved bit default 0 NOT NULL,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET() NOT NULL,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)