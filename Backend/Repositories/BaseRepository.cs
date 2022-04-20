namespace FeedMeDB.Repositories;
public class BaseRepository
{
    public string? azure = Environment.GetEnvironmentVariable("AZURE_DB_STRING");
    public string? local = Environment.GetEnvironmentVariable("LOCAL_DB_STRING");
    public bool useLocal = Environment.GetEnvironmentVariable("USE_LOCAL_DB") == "1";
    public string? connectionString => useLocal ? local : azure;
}
