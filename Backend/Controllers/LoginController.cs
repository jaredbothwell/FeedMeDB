using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using System.Text;


namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    [HttpPost(Name = "PostLogin")]
    public UserModel Post(string userName, string password)
    {

        try
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            string? connectionString = "Server=tcp:cis560team3.database.windows.net,1433;Initial Catalog=CIS560Project;Persist Security Info=False;User ID=SQLMan;Password=BigB@dRecipeB00k;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String sql = "select U.UserID, U.UserName, U.PasswordHash, U.IsRemoved, U.CreatedOn, U.ModifiedOn, U.RemovedOn from Data.[User] U where U.UserName = @u";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@u", userName);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        UserModel user = new UserModel();
                        while (reader.Read())
                        {
                            Object[] values = new Object[reader.FieldCount];
                            int fieldCount = reader.GetValues(values);
                            byte[] dbpassword = (byte[])values[2];
                            byte[] userpassword = HashPassword(password);
                            Console.WriteLine(dbpassword);
                            Console.WriteLine(userpassword);
                            if (dbpassword.SequenceEqual(userpassword))
                            {
                                var x1 = values[4];
                                DateTimeOffset? d1;
                                if (Convert.IsDBNull(x1)) d1 = null;
                                else d1 = reader.GetDateTimeOffset(4);

                                var x2 = values[5];
                                DateTimeOffset? d2;
                                if (Convert.IsDBNull(x2)) d2 = null;
                                else d2 = reader.GetDateTimeOffset(5);

                                var x3 = values[6];
                                DateTimeOffset? d3;
                                if (Convert.IsDBNull(x3)) d3 = null;
                                else d3 = reader.GetDateTimeOffset(6);

                                user = new UserModel((int)values[0], values[1].ToString(), (byte[])values[2], (bool)values[3], d1, d2, d3);
                            }

                        }
                        return user;
                    }
                }
            }
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
            return new UserModel();
        }
    }


    // !!! WARNING !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // !!! NOT SECURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Only for testing
    // TODO: Add actual hashing and salting later
    private byte[] HashPassword(string password)
    {
        byte[] bytes = UnicodeEncoding.ASCII.GetBytes(password);
        return bytes;
    }
}

