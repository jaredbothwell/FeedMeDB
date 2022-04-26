using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class UnitRepository : BaseRepository
{

    public IEnumerable<MeasurementUnitModel> GetAllUnits()
    {
        String sql = "select * from Data.MeasurementUnit";
        using (var connection = new SqlConnection(this.connectionString))
        {
            using (var command = new SqlCommand(sql, connection))
            {
                connection.Open();
                using (var reader = command.ExecuteReader())
                    return TranslateUnits(reader);
            }
        }
    }


    public MeasurementUnitModel TranslateUnit(SqlDataReader reader)
    {
        var unitIDOrdinal = reader.GetOrdinal("MeasurementUnitID");
        var nameOrdinal = reader.GetOrdinal("Name");

        return new MeasurementUnitModel(
            reader.GetInt32(unitIDOrdinal),
            reader.GetString(nameOrdinal)
        );
    }

    public IEnumerable<MeasurementUnitModel> TranslateUnits(SqlDataReader reader)
    {
        var recipes = new List<MeasurementUnitModel>();
        while (reader.Read())
            recipes.Add(TranslateUnit(reader));
        return recipes;
    }



}