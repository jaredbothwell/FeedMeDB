using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using System.Text;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : FeedMeDBController
{
    [HttpPost(Name = "PostLogin")]
    public IActionResult Post(string userName, string password)
    {
        try
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String sql = "select U.UserID, U.UserName, U.PasswordHash, U.IsRemoved, U.CreatedOn, U.ModifiedOn, U.RemovedOn from Data.[User] U where U.UserName = @u";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@u", userName); // 
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        UserModel user = new UserModel();
                        while (reader.Read())
                        {
                            Object[] values = new Object[reader.FieldCount];
                            int fieldCount = reader.GetValues(values);
                            byte[] dbpassword = (byte[])values[2];
                            byte[] userpassword = HashPassword(password);

                            if (dbpassword.SequenceEqual(userpassword))
                            {
                                Console.WriteLine(userName + ": Logged in");
                                user = new UserModel((int)values[0], values[1].ToString(), (byte[])values[2], (bool)values[3],
                                                    GetNullableDTO(values[4]), GetNullableDTO(values[5]), GetNullableDTO(values[6]));

                                // TODO: Implement JWT Token to pass back to client
                                return new OkObjectResult(user); // Valid login. 200-OK + serialized UserModel. 
                            }
                        }
                    }
                }
            }
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
        }
        return new StatusCodeResult(403); // Invalid login. 403-Forbidden result
    }
}

