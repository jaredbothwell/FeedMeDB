using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using FeedMeDB.Repositories;


namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CreateAccountController : FeedMeDBController
{
    [HttpPost(Name = "CreateAccount")]
    public IActionResult Post(string userName, string password)
    {
        var repo = new UserRepository();
        int rowsAffected = repo.CreateAccount(userName, HashPassword(password));
        if (rowsAffected == 1)
        {
            Dictionary<object, object> results = new Dictionary<object, object>();
            results.Add("Status", "Account Created");
            results.Add("Account ID", "4");
            return new OkObjectResult(results);
        }
        return new StatusCodeResult(418);

    }
}

