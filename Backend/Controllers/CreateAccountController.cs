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
        UserModel? user = repo.CreateAccount(userName, HashPassword(password));
        if (user is null)
            return new StatusCodeResult(418);

        return new OkObjectResult(user);
    }
}

