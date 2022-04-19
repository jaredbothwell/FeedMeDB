using System.Text;

namespace FeedMeDB.Models
{
    public class UserModel
    {
        public UserModel(int id, string name, string pass, bool isRemoved, DateTimeOffset? createdOn, DateTimeOffset? modifiedOn, DateTimeOffset? removedOn)
        {
            ID = id;
            Name = name;
            PasswordHash = pass;
            IsRemoved = isRemoved;
            CreatedOn = createdOn;
            ModifiedOn = modifiedOn;
            RemovedOn = removedOn;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
        public bool IsRemoved { get; set; }
        public DateTimeOffset? CreatedOn { get; set; } = null;
        public DateTimeOffset? RemovedOn { get; set; } = null;
        public DateTimeOffset? ModifiedOn { get; set; } = null;
    }
}