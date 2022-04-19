using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : FeedMeDBController
{
    [HttpGet]
    public IEnumerable<UserModel> Get()
    {
        var repo = new UserRepository();
        return repo.GetAllUsers();
    }

    [Route("{id:int}")]
    [HttpGet]
    public UserModel? GetUser(int id)
    {
        UserRepository repo = new UserRepository();
        UserModel? user = repo.GetUserByID(id);
        return user;
    }

    [Route("login")]
    [HttpPost]
    public IActionResult PostLogin(string userName, string password)
    {
        var repo = new UserRepository();
        UserModel? dbUser = repo.GetUserByName(userName);

        if (dbUser is null)
            return new StatusCodeResult(403);

        string dbHash = dbUser.PasswordHash;
        string loginHash = HashPassword(password);

        if ((dbHash is not null) && loginHash.SequenceEqual(dbHash))
            return new OkObjectResult(dbUser);

        return new StatusCodeResult(403); // Invalid login. 403-Forbidden result
    }

    [HttpPost]
    [Route("add")]
    public IActionResult PostCreateAccount(string userName, string password)
    {
        var repo = new UserRepository();
        UserModel? user = repo.CreateAccount(userName, HashPassword(password));
        if (user is null)
            return new StatusCodeResult(418);

        return new OkObjectResult(user);
    }
}