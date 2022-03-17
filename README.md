## Setup

install .net core 6
install node.js

clone repo

### Backend
cd into Backend/
run `dotnet restore` in terminal

### Frontend

cd into Frontend/
create .env with
```
BROWSWER=None
```
run `npm i react-scripts` in terminal

## Run
```
cd Backend
dotnet run
```
new terminal window

```
cd Frontend
npm install
npm start
```
go to `localhost:3000` for react server

backend apis are at `localhost:8000`
swagger api docs at `localhost:8000/swagger`
