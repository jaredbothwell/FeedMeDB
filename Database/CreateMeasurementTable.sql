CREATE TABLE Data.MeasurementUnit(
    MeasurementUnitID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Name] VARCHAR(32) NOT NULL UNIQUE,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset
)