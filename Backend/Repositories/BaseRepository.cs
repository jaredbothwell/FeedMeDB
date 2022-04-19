
namespace FeedMeDB.Repositories
{
    public class BaseRepository
    {
        protected readonly string? connectionString;

        public BaseRepository()
        {
            string? azure = Environment.GetEnvironmentVariable("AZURE_DB_STRING");
            string? local = Environment.GetEnvironmentVariable("LOCAL_DB_STRING");
            bool useLocal = Environment.GetEnvironmentVariable("USE_LOCAL_DB") == "1";
            this.connectionString = useLocal ? local : azure;
        }
    }
}