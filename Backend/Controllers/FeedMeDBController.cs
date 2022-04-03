using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using System.Text;


namespace FeedMeDB.Controllers;

/// <summary>
/// Base class for all controllers
/// Inherits from Microsoft.AspNetCore.Mvc.ControllerBase
/// </summary>
public class FeedMeDBController : ControllerBase
{
    private string? azure = Environment.GetEnvironmentVariable("AZURE_DB_STRING");
    private string? local = Environment.GetEnvironmentVariable("LOCAL_DB_STRING");
    private bool useLocal = Environment.GetEnvironmentVariable("USE_LOCAL_DB") == "1";

    public string? connectionString => useLocal ? local : azure;

    // null fields from the database are returned as a DBNull object.
    // These cannot be casted with (DateTimeOffset?) so use this method to get the correct value for DateTimeOffsets
    // from the database. 
    internal DateTimeOffset? GetNullableDTO(object obj)
    {
        if (Convert.IsDBNull(obj)) return null;
        else return (DateTimeOffset?)obj;
    }

    // !!! WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!! NOT SECURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Only for testing
    // TODO: Add actual hashing and salting later
    protected byte[] HashPassword(string password)
    {
        byte[] bytes = UnicodeEncoding.ASCII.GetBytes(password);
        return bytes;
    }
}