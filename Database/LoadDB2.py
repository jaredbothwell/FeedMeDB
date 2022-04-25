import pandas as pd
import _scproxy
import pymssql

server = "localhost"
user = "sa"
password = "Password123!"
database = "FeedMeDB"

ingredients = pd.read_csv("DataSets/ingredientList.csv")
recipes = pd.read_csv('DataSets/RecipeImport.csv').dropna()
measurement_units = pd.read_csv('DataSets/MeasurementUnits.csv').dropna()
recipe_ingredients = pd.DataFrame([[i[0], i[1], i[2], i[3]] for x,i in pd.read_csv('DataSets/ConvertedRecipeIngredients.csv').iterrows()])

with pymssql.connect(server, user, password, database) as cnxn:
     with cnxn.cursor(as_dict=True) as cursor:
          for index, row in ingredients.iterrows():
               cursor.execute(f"INSERT INTO Data.Ingredient (Name) values('{row.Name}')")
          print('Ingredient load COMPLETE')
          for index, row in recipes.iterrows():
               cursor.execute("INSERT INTO Data.Recipe (Name,CreatedUserID,PrepTime,Difficulty,Directions) values(%s,1,20,1,%s)",
                         (row.title, row.directions))
          print('Recipe load COMPLETE')
          for index, row in measurement_units.iterrows():
               cursor.execute("INSERT INTO Data.MeasurementUnit (Name) values(%s)", (row.Unit))
          print('MeasurementUnit load COMPLETE')
          for index, row in recipe_ingredients.iterrows():
               cursor.execute("EXECUTE Data.InsertRecipeIngredientWithID %d,%s,%s,%d",(row[0], row[3], row[2], row[1]))
          print('RecipeIngredient load COMPLETE')
     cnxn.commit()
print('Database load COMPLETE')
