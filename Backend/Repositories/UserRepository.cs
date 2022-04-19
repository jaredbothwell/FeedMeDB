using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories
{
    public class UserRepository : BaseRepository
    {
        public IEnumerable<UserModel> GetAllUsers()
        {
            // TODO: sql
            String sql = "select * from Data.[User]";
            using (var connection = new SqlConnection(this.connectionString))
            {
                using (var command = new SqlCommand(sql, connection))
                {
                    //command.CommandType = CommandType.StoredProcedure;
                    //command.Parameters.AddWithValue();
                    connection.Open();
                    using (var reader = command.ExecuteReader())
                        return TranslateUsers(reader);
                }
            }
        }

        public UserModel? GetUserByName(string userName)
        {
            // TODO: sql
            String sql = "select U.UserID, U.UserName, U.PasswordHash, U.IsRemoved, U.CreatedOn, U.ModifiedOn, U.RemovedOn from Data.[User] U where U.UserName = @u";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@u", userName);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                            return TranslateUser(reader);
                    }
                }
            }
            return null;
        }

        public UserModel? GetUserByID(int id)
        {
            String sql = "select U.UserID, U.UserName, U.PasswordHash, U.IsRemoved, U.CreatedOn, U.ModifiedOn, U.RemovedOn from Data.[User] U where U.UserID = @id";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                            return TranslateUser(reader);
                    }
                }
            }
            return null;
        }


        public UserModel? CreateAccount(string userName, string passwordHash)
        {
            if (GetUserByName(userName) is not null)
                return null; // User already exists. Don't create new account
            String sql = "insert into Data.[User] (UserName, PasswordHash) values (@name, @pass)";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@name", userName);
                    command.Parameters.AddWithValue("@pass", passwordHash);
                    int numrows = command.ExecuteNonQuery();
                    if (numrows == 1)
                        return GetUserByName(userName);
                    return null; // user was not inserted correctly
                }
            }
        }

        public UserModel TranslateUser(SqlDataReader reader)
        {
            var userIDOrdinal = reader.GetOrdinal("UserID");
            var userNameOrdinal = reader.GetOrdinal("UserName");
            var passwordHashOrdinal = reader.GetOrdinal("PasswordHash");
            var isRemovedOrdinal = reader.GetOrdinal("IsRemoved");
            var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
            var modifiedOnOrdinal = reader.GetOrdinal("ModifiedOn");
            var removedOnOrdinal = reader.GetOrdinal("RemovedOn");
            return new UserModel(
                reader.GetInt32(userIDOrdinal),
                reader.GetString(userNameOrdinal),
                reader.GetString(passwordHashOrdinal),
                reader.GetBoolean(isRemovedOrdinal),
                reader.IsDBNull(createdOnOrdinal) ? null : reader.GetDateTimeOffset(createdOnOrdinal),
                reader.IsDBNull(modifiedOnOrdinal) ? null : reader.GetDateTimeOffset(modifiedOnOrdinal),
                reader.IsDBNull(removedOnOrdinal) ? null : reader.GetDateTimeOffset(removedOnOrdinal)
            );
        }

        public IEnumerable<UserModel> TranslateUsers(SqlDataReader reader)
        {
            List<UserModel> users = new List<UserModel>();
            while (reader.Read())
            {
                UserModel user = TranslateUser(reader);
                users.Add(user);
            }
            return users;
        }
    }
}