using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : FeedMeDBController
{
    [HttpGet(Name = "GetAllUsers")]
    public IEnumerable<UserModel> Get()
    {
        try
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String sql = "select * from Data.[User]";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        List<UserModel> data = new List<UserModel>();
                        while (reader.Read())
                        {
                            Object[] values = new Object[reader.FieldCount];
                            int fieldCount = reader.GetValues(values);
                            UserModel user = new UserModel(
                                                (int)values[0],
                                                values[1].ToString(),
                                                (byte[])values[2],
                                                (bool)values[3],
                                                GetNullableDTO(values[4]),
                                                GetNullableDTO(values[5]),
                                                GetNullableDTO(values[6]));
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