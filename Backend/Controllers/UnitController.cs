using Microsoft.AspNetCore.Mvc;
using FeedMeDB.Models;
using System.Data.SqlClient;
using FeedMeDB;
using FeedMeDB.Repositories;

namespace FeedMeDB.Controllers;

[ApiController]
[Route("api/units")]
public class UnitController : ControllerBase
{
    [HttpGet]
    public IEnumerable<MeasurementUnitModel> Get()
    {
        var repo = new UnitRepository();
        return repo.GetAllUnits();
    }
}