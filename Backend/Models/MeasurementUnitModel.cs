
namespace FeedMeDB.Models;

public class MeasurementUnitModel
{
    public MeasurementUnitModel(int id, string name)
    {
        MeasurementUnitID = id;
        Name = name;
    }

    public int MeasurementUnitID { get; set; }
    public string Name { get; set; }
}
