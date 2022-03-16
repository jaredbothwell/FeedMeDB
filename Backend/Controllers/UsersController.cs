using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet(Name = "GetAllUsers")]
    public IEnumerable<UserModel> Get()
    {
        try
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();

            //string? connectionString = "Server=tcp:cis560team3.database.windows.net,1433;Initial Catalog=CIS560Project;Persist Security Info=False;User ID=SQLMan;Password=JohnKellerP3n1$;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //string connectionString = "Data Source=.;Initial Catalog=FeedMeDB;Persist Security Info=False;User ID=sa;Password=Password123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;";

            string? connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String sql = "select * from Data.[User]";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    // Can add parameters to command
                    // command.Parameters.Add()
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<UserModel> data = new List<UserModel>();
                        while (reader.Read())
                        {
                            Object[] values = new Object[reader.FieldCount];
                            int fieldCount = reader.GetValues(values);
                            UserModel user = new UserModel((int)values[0], values[1].ToString(), (byte[])values[2], (bool)values[3]);
                            data.Add(user);
                        }
                        return data;
                    }
                }
            }
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
            return new List<UserModel>();
        }
    }
}