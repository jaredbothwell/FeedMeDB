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
            using (var command = new SqlCommand("Data.GetSavedRecipes", connection))
            {
                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserID", userID);
                using (var reader = command.ExecuteReader())
                    return TranslateUserRecipes(reader);
            }
        }
    }

    public UserRecipeModel TranslateUserRecipe(SqlDataReader reader)
    {
        var userRecipeOrdinal = reader.GetOrdinal("UserRecipeID");
        var userIDOrdinal = reader.GetOrdinal("UserID");
        var recipeIDOrdinal = reader.GetOrdinal("RecipeID");
        var ratingOrdinal = reader.GetOrdinal("Rating");
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