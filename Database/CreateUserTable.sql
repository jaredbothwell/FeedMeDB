
create SCHEMA Data AUTHORIZATION [dbo];

go

select * from sys.schemas
select * from sys.tables

go

Drop Table IF EXISTS Data.[User];

go

CREATE TABLE Data.[User]
(
    UserID int primary key identity(0,1),
    UserName varchar(20) not null unique,
    PasswordHash varbinary(256) not null,
    IsRemoved bit default 0,
    CreatedOn datetimeoffset default SYSDATETIMEOFFSET(),
    ModifiedOn datetimeoffset,
    RemovedOn datetimeoffset,
)

insert Data.[User] (UserName, PasswordHash)
values 
    (N'testuser2', HASHBYTES('SHA2_256','abcdefg'))

select * from Data.[User]