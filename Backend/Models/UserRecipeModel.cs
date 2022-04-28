using System.Text;

namespace FeedMeDB.Models;
public class UserRecipeModel
{
    public int UserRecipeID { get; set; }
    public int UserID { get; set; }
    public RecipeModel? Recipe { get; set; }
    public int Rating { get; set; }
    public DateTimeOffset? CreatedOn { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? RemovedOn { get; set; }
}
