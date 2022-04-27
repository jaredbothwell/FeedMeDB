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
        String sql = "Data.GetAlLIngredients";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
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
                    return TranslateRecipeIngredients(reader);
            }
        }
    }

    public IngredientModel TranslateIngredient(SqlDataReader reader)
    {
        var ingredientIDOrdinal = reader.GetOrdinal("IngredientID");
        var IngredientNameOrdinal = reader.GetOrdinal("IngredientName");
        var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
        return new IngredientModel()
        {
            IngredientID = reader.GetInt32(ingredientIDOrdinal),
            Name = reader.GetString(IngredientNameOrdinal),
            CreatedOn = reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal)
        };
    }


    public IngredientModel TranslateRecipeIngredient(SqlDataReader reader)
    {
        var ingredientIDOrdinal = reader.GetOrdinal("IngredientID");
        var IngredientNameOrdinal = reader.GetOrdinal("IngredientName");
        var MeasurementQuantityOrdinal = reader.GetOrdinal("MeasurementQuantity");
        var MeasurementUnitIDOrdinal = reader.GetOrdinal("MeasurementUnitID");
        var MeasurementUnitNameOrdinal = reader.GetOrdinal("MeasurementUnitName");
        return new IngredientModel()
        {
            IngredientID = reader.GetInt32(ingredientIDOrdinal),
            Name = reader.GetString(IngredientNameOrdinal),
            MeasurementUnitID = reader.GetInt32(MeasurementUnitIDOrdinal),
            MeasurementUnitName = reader.GetString(MeasurementUnitNameOrdinal),
            MeasurementQuantity = reader.GetDecimal(MeasurementQuantityOrdinal)
        };
    }

    public IEnumerable<IngredientModel> TranslateIngredients(SqlDataReader reader)
    {
        var recipes = new List<IngredientModel>();
        while (reader.Read())
            recipes.Add(TranslateIngredient(reader));
        return recipes;
    }

    public IEnumerable<IngredientModel> TranslateRecipeIngredients(SqlDataReader reader)
    {
        var recipes = new List<IngredientModel>();
        while (reader.Read())
            recipes.Add(TranslateRecipeIngredient(reader));
        return recipes;
    }
}
