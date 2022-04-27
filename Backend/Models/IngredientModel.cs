
namespace FeedMeDB.Models;

public class IngredientModel
{

    public IngredientModel(int id, string name, DateTimeOffset? createdon, DateTimeOffset? modifiedon, DateTimeOffset? removedon, int? unitID, string? unitName, decimal? quantity)
    {
        IngredientID = id;
        Name = name;
        CreatedOn = createdon;
        ModifiedOn = modifiedon;
        RemovedOn = removedon;
        MeasurementQuantity = quantity;
        MeasurementUnitID = unitID;
        MeasurementUnitName = unitName;
    }

    public IngredientModel(){}

    public int IngredientID { get; set; }
    public string Name { get; set; } = "";
    public DateTimeOffset? CreatedOn { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? RemovedOn { get; set; }


    public int? MeasurementUnitID { get; set; }

    public string? MeasurementUnitName { get; set; }

    public decimal? MeasurementQuantity { get; set; }
}
