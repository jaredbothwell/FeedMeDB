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


    [Route("user/{id:int}")]
    [HttpGet]
    public IEnumerable<RecipeModel> GetUserRecipes(int id)
    {
        var repo = new RecipeRepository();
        return repo.GetAllUserRecipes(id);
    }

    [Route("createdby/{id:int}")]
    [HttpGet]
    public IEnumerable<RecipeModel> GetRecipesCreatedBy(int id)
    {
        var repo = new RecipeRepository();
        return repo.GetCreatedRecipes(id);
    }


}