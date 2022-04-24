# Backend

## Set up Database

Create environment variables for connection strings.

### PowerShell

```powershell
$Env:AZURE_DB_STRING = "connectionstring"

$Env:ASPNETCORE_ENVIRONMENT = "Development"

$Env:USE_LOCAL_DB = "0"
```


### Windows

Add environment variables to `FeedMeDB/.env`

```js
AZURE_DB_STRING=Server=tcp:cis560team3.database.windows.net,1433;Initial Catalog=CIS560Project;Persist Security Info=False;User ID=SQLMan;Password=BigB@dRecipeB00k;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
LOCAL_DB_STRING=your localdb connection string
USE_LOCAL_DB=0
```

### Mac

Add environment variables to  `FeedMeDB/.vscode/launch.json` under `env`. 

```json
"env": {
    "ASPNETCORE_ENVIRONMENT": "Development",

    "AZURE_DB_STRING": "Server=tcp:cis560team3.database.windows.net,1433;Initial Catalog=CIS560Project;Persist Security Info=False;User ID=SQLMan;Password=BigB@dRecipeB00k;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
    "LOCAL_DB_STRING": "<your local db's connection string>",
    "USE_LOCAL_DB": "0",
},
```
> #### Since the enviroment variables are only set in `launch.json` you have to start the backend server with VS Code's Run and Debug

## Controllers

All controllers for API endpoints inherit from `FeedMeDBController`. 

`FeedMeDBController` has the `connectionString` property to get the correct connection string from the environment variables. It also has some common methods used by other controllers. 

