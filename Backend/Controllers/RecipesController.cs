using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/recipes")]
public class RecipesController : ControllerBase
{
    // route: /api/recipes/
    [HttpGet]
    public IEnumerable<RecipeModel> Get()
    {
        var repo = new RecipeRepository();
        return repo.GetAllRecipes();
    }
}