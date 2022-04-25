using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/ingredients")]
public class IngredientsController : ControllerBase
{
    [HttpGet]
    public IEnumerable<IngredientModel> GetIngrediets()
    {
        var repo = new IngredientRepository();
        return repo.GetAllIngredients();
    }

}