using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class IngredientRepository : BaseRepository
{
    public IEnumerable<IngredientModel> GetAllIngredients()
    {
        // TODO: use stored procedure
        String sql = "select * from Data.Ingredient";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateIngredients(reader);
            }
        }
    }

    public IEnumerable<IngredientModel> GetIngredientsForRecipe(int id)
    {
        String sql = "select I.IngredientID, I.Name, I.CreatedOn, I.ModifiedOn, I.RemovedOn from Data.Ingredient I inner join Data.RecipeIngredient RI on I.IngredientID = RI.IngredientID where RI.RecipeID = @id";

        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                connection.Open();
                command.Parameters.AddWithValue("@id", id);
                using (var reader = command.ExecuteReader())
                    return TranslateIngredients(reader);
            }
        }
    }

    public IngredientModel TranslateIngredient(SqlDataReader reader)
    {
        var ingredientIDOrdinal = reader.GetOrdinal("IngredientID");
        var nameOrdinal = reader.GetOrdinal("Name");
        var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
        var modifiedOnOrdinal = reader.GetOrdinal("ModifiedOn");
        var removedOnOrdinal = reader.GetOrdinal("RemovedOn");
        return new IngredientModel(
            reader.GetInt32(ingredientIDOrdinal),
            reader.GetString(nameOrdinal),
            reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal),
            reader.IsDBNull(modifiedOnOrdinal) ? null : reader.GetDateTimeOffset(modifiedOnOrdinal),
            reader.IsDBNull(removedOnOrdinal) ? null : reader.GetDateTimeOffset(removedOnOrdinal), null, null, null
        );
    }

    public IEnumerable<IngredientModel> TranslateIngredients(SqlDataReader reader)
    {
        var recipes = new List<IngredientModel>();
        while (reader.Read())
            recipes.Add(TranslateIngredient(reader));
        return recipes;
    }
}
