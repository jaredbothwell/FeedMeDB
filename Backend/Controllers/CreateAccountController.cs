using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data;
using System.Data.SqlClient;
using System.Text;


namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CreateAccountController : FeedMeDBController
{
    [HttpPost(Name = "CreateAccount")]
    public IActionResult Post(string userName, string password)
    {
        try
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                String sql = "insert into Data.[User] (UserName, PasswordHash) values (@name, @pass)";

                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@name", userName);
                    command.Parameters.AddWithValue("@pass", HashPassword(password));
                    int rowsAffected = command.ExecuteNonQuery(); 
                    if (rowsAffected == 1) return new OkObjectResult("account created"); // TODO: create JWT Token
                }
            }
        }
        catch (SqlException e)
        {
            Console.WriteLine(e.ToString());
        }
        return new StatusCodeResult(418);
    }
}

