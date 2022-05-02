using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class AggregateRepository : BaseRepository
{

    public IEnumerable<object> GetTopUsers()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetAvgRatingsByUserID", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateResults(reader);
            }
        }
    }

    public IEnumerable<object> GetTopRecipes()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetTopRecipes", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateResults(reader);
            }
        }
    }

    public IEnumerable<object> GetMostActiveUsers()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetMostActiveUsers", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateResults(reader);
            }
        }
    }

    public Dictionary<string, object>? GetRecipeAverageRating(int RecipeID)
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.GetAvgRatingByRecipeID", connection))
            {
                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@RecipeID", RecipeID);
                using (var reader = command.ExecuteReader())
                {
                    var cols = new List<string>();
                    for (var i = 0; i < reader.FieldCount; i++)
                        cols.Add(reader.GetName(i));
                    if (reader.Read())
                        return SerializeRow(cols, reader);
                    return null;
                }
            }
        }
    }

    public IEnumerable<object> GetMostCommonIngredients()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand("Data.MostCommonIngredients", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateResults(reader);
            }
        }
    }

    public IEnumerable<object> TranslateResults(SqlDataReader reader)
    {
        var results = new List<Dictionary<string, object>>();
        var cols = new List<string>();
        for (var i = 0; i < reader.FieldCount; i++)
            cols.Add(reader.GetName(i));

        while (reader.Read())
            results.Add(SerializeRow(cols, reader));

        return results;
    }

    private Dictionary<string, object> SerializeRow(IEnumerable<string> cols, SqlDataReader reader)
    {
        var result = new Dictionary<string, object>();
        foreach (var col in cols)
            result.Add(col, reader[col]);
        return result;
    }
}
