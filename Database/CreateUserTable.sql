
create SCHEMA Data AUTHORIZATION [dbo];

go

select * from sys.schemas
select * from sys.tables

go

Drop Table IF EXISTS Data.[User];

go

CREATE TABLE Data.[User]
(
    UserID int primary key,
    UserName varchar(20) not null,
    PasswordHash varchar(100) not null,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset,
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

insert Data.[User] ( UserID, UserName, PasswordHash, CreatedOn)
values 
    (1, N'testuser', N'abcdefg', SYSDATETIMEOFFSET())

select * from Data.[User]