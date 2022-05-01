using FeedMeDB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Transactions;

namespace FeedMeDB.Repositories;

public class UserRepository : BaseRepository
{
    public IEnumerable<UserModel> GetAllUsers()
    {
        using (var connection = new SqlConnection(this.connectionString))
        {
            connection.Open();
            using (var command = new SqlCommand("Data.GetAllUsers", connection))
            {
                using (var reader = command.ExecuteReader())
                    return TranslateUsers(reader);
            }
        }
    }

    public UserModel? GetUserByName(string userName)
    {
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand("Data.GetUserByName", connection))
            {
                command.Parameters.AddWithValue("@userName", userName);
                command.CommandType = CommandType.StoredProcedure;
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
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand("Data.GetUserByID", connection))
            {
                command.Parameters.AddWithValue("@UserID", id);
                command.CommandType = CommandType.StoredProcedure;
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
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand("Data.CreateUser", connection))
            {
                command.Parameters.AddWithValue("@userName", userName);
                command.Parameters.AddWithValue("@passwordHash", passwordHash);
                command.CommandType = CommandType.StoredProcedure;
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                        return TranslateUser(reader);
                }
            }
        }
        return null; // user was not inserted correctly
    }

    public bool EditUserName(int userID, string newUserName)
    {
        UserModel? user = GetUserByID(userID);
        if (user is null)
            return false; // user does not exist

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            using (SqlCommand command = new SqlCommand("Data.EditUser", connection))
            {
                connection.Open();
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@NewUserName", newUserName);
                command.Parameters.AddWithValue("@UserID", userID);
                int numrows = command.ExecuteNonQuery();
                if (numrows == 1)
                    return true;
                return false; // user was not inserted correctly
            }
        }
    }

    public bool RemoveUser(int userID)
    {
        UserModel? user = GetUserByID(userID);
        if (user is null)
            return false; // user does not exist
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            using (SqlCommand command = new SqlCommand("Data.RemoveUser", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@UserID", userID);
                int numrows = command.ExecuteNonQuery();
                if (numrows == 1)
                    return true;
                return false; // user was not removed correctly
            }
        }
    }

    public UserModel TranslateUser(SqlDataReader reader)
    {
        var userIDOrdinal = reader.GetOrdinal("UserID");
        var userNameOrdinal = reader.GetOrdinal("UserName");
        var passwordHashOrdinal = reader.GetOrdinal("PasswordHash");
        var createdOnOrdinal = reader.GetOrdinal("CreatedOn");
        var modifiedOnOrdinal = reader.GetOrdinal("ModifiedOn");
        var removedOnOrdinal = reader.GetOrdinal("RemovedOn");
        return new UserModel(
            reader.GetInt32(userIDOrdinal),
            reader.GetString(userNameOrdinal),
            reader.GetString(passwordHashOrdinal),
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
