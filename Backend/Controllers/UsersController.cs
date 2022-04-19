using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;
using System.Text;
using System.Security.Cryptography;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    [Route("")] // api/users
    [HttpGet]
    public IEnumerable<UserModel> Get()
    {
        var repo = new UserRepository();
        return repo.GetAllUsers();
    }

    [Route("{id:int}")] // api/users/id
    [HttpGet]
    public UserModel? GetUserByID(int id)
    {
        UserRepository repo = new UserRepository();
        UserModel? user = repo.GetUserByID(id);
        return user;
    }

    [Route("{name}")] // api/users/name
    [HttpGet]
    public UserModel? GetUserByName(string name)
    {
        var repo = new UserRepository();
        return repo.GetUserByName(name);
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
    [Route("add")] // api/users/add
    public IActionResult PostCreateAccount(string userName, string password)
    {
        var repo = new UserRepository();
        UserModel? user = repo.CreateAccount(userName, HashPassword(password));
        if (user is null)
            return new StatusCodeResult(418);

        return new OkObjectResult(user);
    }

    [HttpPut]
    [Route("edit/{id:int}")] // api/users/edit/id
    public IActionResult EditUserName(int id, string newUserName)
    {
        var repo = new UserRepository();
        var isChanged = repo.EditUserName(id, newUserName);
        if (isChanged)
            return new OkObjectResult("UserName was successfully changed");
        return new StatusCodeResult(403);
    }

    [HttpPut]
    [Route("remove/{id:int}")]
    public IActionResult RemoveUser(int id)
    {
        var repo = new UserRepository();
        var isRemoved = repo.RemoveUser(id);
        if (isRemoved)
            return new OkObjectResult("User was successfully removed");
        return new StatusCodeResult(404);
    }

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