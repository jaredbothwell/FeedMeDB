using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using System.Text;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : FeedMeDBController
{
    [HttpPost]
    public IActionResult Post(string userName, string password)
    {
        var repo = new UserRepository();
        UserModel? dbUser = repo.GetUserByName(userName);

        if (dbUser is null)
            return new StatusCodeResult(403);

        string dbHash = dbUser.PasswordHash;
        string loginHash = HashPassword(password);

        if (ValidateUser(dbHash, loginHash))
            return new OkObjectResult(dbUser);

        return new StatusCodeResult(403); // Invalid login. 403-Forbidden result
    }



    private bool ValidateUser(string? dbPasswordHash, string loginPasswordHash)
    {
        return (dbPasswordHash is not null) && loginPasswordHash.SequenceEqual(dbPasswordHash);
    }
}

