
namespace FeedMeDB.Models;

public class IngredientModel
{

    public IngredientModel(int id, string name, DateTimeOffset? createdon, DateTimeOffset? modifiedon, DateTimeOffset? removedon)
    {
        IngredientID = id;
        Name = name;
        CreatedOn = createdon;
        ModifiedOn = modifiedon;
        RemovedOn = removedon;
    }

    public int IngredientID { get; set; }
    public string Name { get; set; }
    public DateTimeOffset? CreatedOn { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? RemovedOn { get; set; }
}
