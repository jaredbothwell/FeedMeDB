using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;
using System.Text.Json;

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

    [Route("add")]
    [HttpPost]
    public void Post([FromBody] RecipeModel recipe)
    {
        var repo = new RecipeRepository();
        repo.CreateRecipe(recipe);
    }

    [Route("edit")]
    [HttpPut]
    public void Edit([FromBody] JsonDocument body)
    {
        var repo = new RecipeRepository();

        Dictionary<string, JsonElement> dict = body.Deserialize<Dictionary<string, JsonElement>>() ?? new Dictionary<string, JsonElement>();

        RecipeModel? newRecipe = JsonSerializer.Deserialize<RecipeModel>(dict["recipe"], options: null);
        List<int>? oldIngredientIDs = JsonSerializer.Deserialize<List<int>>(dict["ingredientIDs"]);

        repo.EditRecipe(newRecipe, oldIngredientIDs);
    }

    [Route("remove")]
    [HttpPut]
    public void Remove(int id)
    {
        var repo = new RecipeRepository();
        repo.RemoveRecipe(id);
    }


}