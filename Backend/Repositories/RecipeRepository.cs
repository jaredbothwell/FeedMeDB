using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class RecipeRepository : BaseRepository
{
    public IEnumerable<RecipeModel> GetAllRecipes(int page)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetAllRecipes", connection))
            {
                command.Parameters.AddWithValue("@page", page);
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateRecipes(reader);
            }
        }
    }

    public IEnumerable<RecipeModel> GetAllUserRecipes(int userID)
    {
        String sql = "select * from Data.Recipe R where R.CreatedUserID = @userID UNION select * from Data.Recipe R inner join Data.UserRecipe UR on R.RecipeID = UR.RecipeID and UR.UserID = @userID";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@userID", userID);
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateRecipes(reader);
            }
        }
    }

    public RecipeModel? GetRecipeByID(int id)
    {
        String sql = "select * from Data.Recipe R where R.RecipeID = @id";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                command.Parameters.AddWithValue("@id", id);
                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                        return TranslateRecipe(reader);
                    return null;
                }
            }
        }
    }

    public IEnumerable<RecipeModel> GetCreatedRecipes(int userID)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetRecipeByCreatedUserID", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserID", userID);
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateRecipes(reader);
            }
        }
    }

    public IEnumerable<RecipeModel> GetRecipesByName(string name)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetRecipeByNameQuery", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserQuery", name);
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateRecipes(reader);
            }
        }
    }

    public IEnumerable<RecipeModel> GetRecipeModelsByNameAndIngredient(string name, string ingredients)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("GetRecipeByQueryAndIngredient", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserQuery", name);
                command.Parameters.AddWithValue("@IngredientList", ingredients);
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateRecipes(reader);
            }
        }
    }

    public bool CreateRecipe(RecipeModel recipe)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            int recipeID = -1;
            using (var command = new SqlCommand("Data.CreateRecipe", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@name", recipe.Name);
                command.Parameters.AddWithValue("@prepTime", recipe.PrepTime);
                command.Parameters.AddWithValue("@userID", recipe.CreatedByID);
                command.Parameters.AddWithValue("@difficulty", recipe.Difficulty);
                command.Parameters.AddWithValue("@directions", recipe.Directions);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                        recipeID = Convert.ToInt32(reader.GetDecimal(0));
                }
            }
            foreach (var ingredient in recipe.Ingredients)
            {
                using (var command = new SqlCommand("Data.AddIngredientToRecipe", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@recipeID", recipeID);
                    command.Parameters.AddWithValue("@ingredientName", ingredient.Name);
                    command.Parameters.AddWithValue("@quantity", ingredient.MeasurementQuantity);
                    command.Parameters.AddWithValue("@unitID", ingredient.MeasurementUnitID);

                    command.ExecuteNonQuery();
                }
            }
        }
        return true;
    }

    public bool EditRecipe(RecipeModel recipe, List<int> ingredientsToRemove)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            connection.Open();
            SqlTransaction transaction = connection.BeginTransaction();

            // remove recipe ingredients
            foreach (var ingredientID in ingredientsToRemove)
            {
                using (var command = new SqlCommand("Data.RemoveRecipeIngredient", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ingredientID", ingredientID);
                    command.Parameters.AddWithValue("@recipeID", recipe.ID);
                    command.Transaction = transaction;
                    command.ExecuteNonQuery();
                }
            }

            // edit recipe fields
            using (var command = new SqlCommand("Data.UpdateRecipe", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@recipeID", recipe.ID);
                command.Parameters.AddWithValue("@recipeName", recipe.Name);
                command.Parameters.AddWithValue("@prepTime", recipe.PrepTime);
                command.Parameters.AddWithValue("@difficulty", recipe.Difficulty);
                command.Parameters.AddWithValue("@directions", recipe.Directions);
                command.Transaction = transaction;
                command.ExecuteNonQuery();
            }


            // add/edit recipe ingredients
            foreach (var ingredient in recipe.Ingredients)
            {
                using (var command = new SqlCommand("Data.UpdateRecipeIngredient", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ingredientName", ingredient.Name);
                    command.Parameters.AddWithValue("@recipeID", recipe.ID);
                    command.Parameters.AddWithValue("@quantity", ingredient.MeasurementQuantity);
                    command.Parameters.AddWithValue("@unitID", ingredient.MeasurementUnitID);
                    command.Transaction = transaction;
                    command.ExecuteNonQuery();
                }
            }

            transaction.Commit();
        }





        return true;
    }

    public RecipeModel TranslateRecipe(SqlDataReader reader)
    {
        var recipeIDOrdinal = reader.GetOrdinal("RecipeID");
        var createdUserIDOrdinal = reader.GetOrdinal("CreatedUserID");
        var nameOrdinal = reader.GetOrdinal("Name");
        var prepTimeOrdinal = reader.GetOrdinal("PrepTime");
        var difficultyOrdinal = reader.GetOrdinal("Difficulty");
        var directionsOrdinal = reader.GetOrdinal("Directions");
        var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
        var modifiedOnOrdinal = reader.GetOrdinal("ModifiedOn");
        var removedOnOrdinal = reader.GetOrdinal("RemovedOn");

        var recipe = new RecipeModel(
            reader.GetInt32(recipeIDOrdinal),
            reader.GetInt32(createdUserIDOrdinal),
            reader.GetString(nameOrdinal),
            reader.GetInt32(prepTimeOrdinal),
            reader.GetInt32(difficultyOrdinal),
            reader.GetString(directionsOrdinal),
            reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal),
            reader.IsDBNull(modifiedOnOrdinal) ? null : reader.GetDateTimeOffset(modifiedOnOrdinal),
            reader.IsDBNull(removedOnOrdinal) ? null : reader.GetDateTimeOffset(removedOnOrdinal),
            new List<IngredientModel>()
        );

        var ingredientRepo = new IngredientRepository();
        recipe.Ingredients = ingredientRepo.GetIngredientsForRecipe(recipe.ID) as List<IngredientModel> ?? new List<IngredientModel>();
        return recipe;
    }

    public IEnumerable<RecipeModel> TranslateRecipes(SqlDataReader reader)
    {
        var recipes = new List<RecipeModel>();
        while (reader.Read())
            recipes.Add(TranslateRecipe(reader));
        return recipes;
    }
}
