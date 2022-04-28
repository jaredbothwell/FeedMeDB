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
        return repo.GetAllRecipes(1);
    }

    // route: /api/recipes/
    [Route("page/{page:int}")]
    [HttpGet]
    public IEnumerable<RecipeModel> Get(int page)
    {
        var repo = new RecipeRepository();
        return repo.GetAllRecipes(page);
    }


    [Route("{id:int}")]
    [HttpGet]
    public IActionResult GetRecipeByID(int id)
    {
        var repo = new RecipeRepository();
        RecipeModel? recipe = repo.GetRecipeByID(id);
        if (recipe is null)
            return new StatusCodeResult(404);
        return new OkObjectResult(repo.GetRecipeByID(id));
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


    [Route("query/{name}")]
    [HttpGet]
    public IEnumerable<RecipeModel> GetRecipesByName(string name)
    {
        var repo = new RecipeRepository();
        return repo.GetRecipesByName(name);
    }


    [Route("search")]
    [HttpGet]
    public IEnumerable<RecipeModel> GetRecipesByNameAndIngredient(string ingredients, string name = "")
    {
        var repo = new RecipeRepository();
        return repo.GetRecipeModelsByNameAndIngredient(name, ingredients);
    }

    [Route("saved")]
    [HttpGet]
    public IEnumerable<UserRecipeModel> GetSavedRecipes(int userID)
    {
        var repo = new UserRecipeRepository();
        return repo.GetSavedRecipes(userID);
    }

    [Route("add")]
    [HttpPost]
    public void Post([FromBody] RecipeModel recipe)
    {
        var repo = new RecipeRepository();
        repo.CreateRecipe(recipe);
    }


}