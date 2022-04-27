# Load Ingredients
import pandas as pd
import _scproxy
import pymssql

df = pd.read_csv("./DataSets/ingredientList.csv")
df

#cnxn = pymssql.connect(server='localhost', user='sa', password='bigStrongPwd1107@', database='CIS560Project')
cnxn = pymssql.connect(server='cis560team3.database.windows.net', user='SQLMan', password='BigB@dRecipeB00k', database='CIS560Project')
cursor = cnxn.cursor(as_dict=True)
# Insert Dataframe into SQL Server:
for index, row in df.iterrows():
     cursor.execute("INSERT INTO Data.Ingredient (Name) values(%s)", row.Name)
cnxn.commit()
cursor.close()
print('Ingredient load COMPLETE')

df = pd.read_csv('./DataSets/RecipeImport.csv')
df = df.dropna()

#import pymssql
cnxn = pymssql.connect(server='cis560team3.database.windows.net', user='SQLMan', password='BigB@dRecipeB00k', database='CIS560Project')
cursor = cnxn.cursor(as_dict=True)
for index, row in df.iterrows():
     #print(row)
     cursor.execute("INSERT INTO Data.Recipe (Name,CreatedUserID,PrepTime,Difficulty,Directions) values(%s,1,%d,%d,%s)", (row.title,row.PrepTime,row.Difficulty,row.directions))
cnxn.commit()
cursor.close()
cnxn.close()
print('Recipe load COMPLETE')

cnxn = pymssql.connect(server='cis560team3.database.windows.net', user='SQLMan', password='BigB@dRecipeB00k', database='CIS560Project')
cursor = cnxn.cursor(as_dict=True)
df = pd.read_csv('./DataSets/MeasurementUnits.csv')
df = df.dropna()
for index, row in df.iterrows():
     #print(row)
     cursor.execute("INSERT INTO Data.MeasurementUnit (Name) values(%s)", (row.Unit))
     #print(row)
cnxn.commit()
cursor.close()
cnxn.close()
print('MeasurementUnit load COMPLETE')

#Used to parse ingredients to be input into RecipeIngredientDB
ingMeas = pd.read_csv('./DataSets/ConvertedRecipeIngredients.csv')
output = []

for x,i in ingMeas.iterrows():
    recipeID = i[0]
    quantity = i[1]
    unit = i[2]
    ingredient = i[3]
    output.append([recipeID,quantity,unit,ingredient])
    #print(recipeID,quantity,unit,ingredient)
df = pd.DataFrame(output)
#print(df)
cnxn = pymssql.connect(server='cis560team3.database.windows.net', user='SQLMan', password='BigB@dRecipeB00k', database='CIS560Project')
cursor = cnxn.cursor(as_dict=True)
# Insert Dataframe into SQL Server:
for index, row in df.iterrows():
    cursor.execute("EXECUTE Data.InsertRecipeIngredientWithID %d,%s,%s,%d", (row[0],row[3],row[2],row[1]))
cnxn.commit()
cursor.close()
print('RecipeIngredient load COMPLETE')
print('Database load COMPLETE')