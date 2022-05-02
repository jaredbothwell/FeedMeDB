using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/aggregate")]
public class AggregateController : ControllerBase
{
    [Route("top-users")]
    [HttpGet]
    public IEnumerable<object> GetTopUsers()
    {
        var repo = new AggregateRepository();
        return repo.GetTopUsers();
    }

    [Route("top-recipes")]
    [HttpGet]
    public IEnumerable<object> GetTopRecipes()
    {
        var repo = new AggregateRepository();
        return repo.GetTopRecipes();
    }

    [Route("most-active-users")]
    [HttpGet]
    public IEnumerable<object> GetMostActiveUsers()
    {
        var repo = new AggregateRepository();
        return repo.GetMostActiveUsers();
    }

    [Route("recipe-average-rating/{id:int}")]
    [HttpGet]
    public Dictionary<string, object>? GetAverageRatingByRecipeID(int id)
    {
        var repo = new AggregateRepository();
        return repo.GetRecipeAverageRating(id);
    }

    [Route("most-common-ingredients")]
    [HttpGet]
    public IEnumerable<object> GetMostCommonIngredients()
    {
        var repo = new AggregateRepository();
        return repo.GetMostCommonIngredients();
    }



}