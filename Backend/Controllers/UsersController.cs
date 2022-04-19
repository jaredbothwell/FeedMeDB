using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : FeedMeDBController
{
    [HttpGet(Name = "GetAllUsers")]
    public IEnumerable<UserModel> Get()
    {
        var repo = new UserRepository();
        return repo.GetAllUsers();
    }
}