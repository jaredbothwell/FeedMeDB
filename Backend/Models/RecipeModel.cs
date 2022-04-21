
namespace FeedMeDB.Models
{
    public class RecipeModel
    {

        public RecipeModel(int id, int createdby, string name, int prep, int diff, string dir, DateTimeOffset? created, DateTimeOffset? modified, DateTimeOffset? removed)
        {
            ID = id;
            CreatedByID = createdby;
            Name = name;
            PrepTime = prep;
            Difficulty = diff;
            Directions = dir;
            CreatedOn = created;
            ModifiedOn = modified;
            RemovedOn = removed;
        }

        public int ID { get; set; }
        public int CreatedByID { get; set; }
        public string Name { get; set; }
        public int PrepTime { get; set; }
        public int Difficulty { get; set; }
        public string Directions { get; set; }
        public DateTimeOffset? CreatedOn { get; set; } = null;
        public DateTimeOffset? RemovedOn { get; set; } = null;
        public DateTimeOffset? ModifiedOn { get; set; } = null;
        public List<UserModel> Users { get; set; } = new List<UserModel>();

        public List<object> Ingredients {get; set; } = new List<object>();
    }
}