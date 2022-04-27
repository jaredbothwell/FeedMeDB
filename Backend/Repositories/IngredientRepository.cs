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
        String sql = "Data.GetRecipeIngredients";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {

                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@RecipeID", id);
                using (var reader = command.ExecuteReader())
                    return TranslateIngredients(reader);
            }
        }
    }

    public IngredientModel TranslateIngredient(SqlDataReader reader)
    {
        var ingredientIDOrdinal = reader.GetOrdinal("IngredientID");
        var IngredientNameOrdinal = reader.GetOrdinal("IngredientName");
        var MeasurementQuantityOrdinal = reader.GetOrdinal("MeasurementQuantity");
        var MeasurementUnitIDOrdinal = reader.GetOrdinal("MeasurementUnitID");
        var MeasurementUnitNameOrdinal = reader.GetOrdinal("MeasurementUnitName");
        return new IngredientModel(
            reader.GetInt32(ingredientIDOrdinal),
            reader.GetString(IngredientNameOrdinal),
            null, // don't need to return created on date
            reader.GetInt32(MeasurementUnitIDOrdinal),
            reader.GetString(MeasurementUnitNameOrdinal),
            reader.GetDecimal(MeasurementQuantityOrdinal)
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
