using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/user-recipes")]
public class UserRecipesController : ControllerBase
{
    [Route("{userID:int}")]
    [HttpGet]
    public IEnumerable<UserRecipeModel> GetUserRecipeModels(int userID)
    {
        var repo = new UserRecipeRepository();
        return repo.GetSavedRecipes(userID);
    }

}