using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class UserRecipeRepository : BaseRepository
{

    public IEnumerable<UserRecipeModel> GetSavedRecipes(int userID)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetBookmarkedRecipes", connection))
            {
                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserID", userID);
                using (var reader = command.ExecuteReader())
                    return TranslateUserRecipes(reader);
            }
        }
    }

    public void CreateOrUpdateUserRecipe(UserRecipeModel userRecipe)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.CreateOrUpdateUserRecipe", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserID", userRecipe.UserID);
                command.Parameters.AddWithValue("@RecipeID", userRecipe.Recipe.ID);
                command.Parameters.AddWithValue("@IsBookmarked", userRecipe.IsBookmarked);
                command.Parameters.AddWithValue("@Rating", userRecipe.Rating);
                connection.Open();
                command.ExecuteNonQuery();
            }
        }
    }


    public UserRecipeModel TranslateUserRecipe(SqlDataReader reader)
    {
        var userRecipeOrdinal = reader.GetOrdinal("UserRecipeID");
        var userIDOrdinal = reader.GetOrdinal("UserID");
        var recipeIDOrdinal = reader.GetOrdinal("RecipeID");
        var ratingOrdinal = reader.GetOrdinal("Rating");
        var isbookmarkedOrdinal = reader.GetOrdinal("IsBookmarked");
        var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
        var modifiedOnOrdinal = reader.GetOrdinal("ModifiedOn");
        var removedOnOrdinal = reader.GetOrdinal("RemovedOn");

        var recipeRepo = new RecipeRepository();
        return new UserRecipeModel()
        {
            UserRecipeID = reader.GetInt32(userRecipeOrdinal),
            UserID = reader.GetInt32(userIDOrdinal),
            Recipe = recipeRepo.GetRecipeByID(reader.GetInt32(recipeIDOrdinal)),
            Rating = reader.GetInt32(ratingOrdinal),
            IsBookmarked = reader.GetBoolean(isbookmarkedOrdinal),
            CreatedOn = reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal),
            ModifiedOn = reader.IsDBNull(modifiedOnOrdinal) ? null : reader.GetDateTimeOffset(modifiedOnOrdinal),
            RemovedOn = reader.IsDBNull(removedOnOrdinal) ? null : reader.GetDateTimeOffset(removedOnOrdinal)
        };
    }

    public IEnumerable<UserRecipeModel> TranslateUserRecipes(SqlDataReader reader)
    {
        var userRecipes = new List<UserRecipeModel>();
        while (reader.Read())
            userRecipes.Add(TranslateUserRecipe(reader));
        return userRecipes;
    }

}