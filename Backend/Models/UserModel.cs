using System.Text;

namespace FeedMeDB.Models
{
    public class UserModel
    {
        public UserModel(int id, string? name, byte[] pass, bool isRemoved)
        {
            ID = id;
            Name = name;
            PasswordHash = pass;
            IsRemoved = isRemoved;
            CreatedOn = null;
            ModifiedOn = null;
            RemovedOn = null;
        }

        public UserModel(int id, string? name, byte[] pass, bool isRemoved, DateTimeOffset? createdOn, DateTimeOffset? modifiedOn, DateTimeOffset? removedOn)
        {
            ID = id;
            Name = name;
            PasswordHash = pass;
            IsRemoved = isRemoved;
            CreatedOn = createdOn;
            ModifiedOn = modifiedOn;
            RemovedOn = removedOn;
        }

        public UserModel()
        {
            ID = 2;
            Name = null;
            PasswordHash = Encoding.ASCII.GetBytes("password"); ;
            IsRemoved = false;
            CreatedOn = null;
            ModifiedOn = null;
            RemovedOn = null;

        }

        public int ID { get; set; }
        public string? Name { get; set; } = null;

        public byte[] PasswordHash { get; set; }
        public bool IsRemoved { get; set; }

        public DateTimeOffset? CreatedOn { get; set; } = null;

        public DateTimeOffset? RemovedOn { get; set; } = null;

        public DateTimeOffset? ModifiedOn { get; set; } = null;
    }
}