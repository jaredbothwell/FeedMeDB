using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using System.Text;
using System.Security.Cryptography;


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


    // TODO: Add salting later
    protected string HashPassword(string password)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.Unicode.GetBytes(password));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}