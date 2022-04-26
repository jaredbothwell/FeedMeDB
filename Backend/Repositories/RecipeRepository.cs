using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class RecipeRepository : BaseRepository
{
    public IEnumerable<RecipeModel> GetAllRecipes()
    {
        // TODO: use stored procedure
        String sql = "select * from Data.Recipe";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
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
            using (var command = new SqlCommand("GetRecipeByNameQuery", connection))
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
        return new RecipeModel(
            reader.GetInt32(recipeIDOrdinal),
            reader.GetInt32(createdUserIDOrdinal),
            reader.GetString(nameOrdinal),
            reader.GetInt32(prepTimeOrdinal),
            reader.GetInt32(difficultyOrdinal),
            reader.GetString(directionsOrdinal),
            reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal),
            reader.IsDBNull(modifiedOnOrdinal) ? null : reader.GetDateTimeOffset(modifiedOnOrdinal),
            reader.IsDBNull(removedOnOrdinal) ? null : reader.GetDateTimeOffset(removedOnOrdinal)
        );
    }

    public IEnumerable<RecipeModel> TranslateRecipes(SqlDataReader reader)
    {
        var recipes = new List<RecipeModel>();
        while (reader.Read())
            recipes.Add(TranslateRecipe(reader));
        return recipes;
    }
}
