
namespace Repositories.Models;

public class PersonalDetails
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Birthday { get; set; }
    public int? Gender { get; set; }

    public PersonalDetails( string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int gender)
    {
        FirstName= firstName;
        LastName= lastName; 
        PhoneNumber= phoneNumber;
        Birthday = birthday;
        Gender = gender;
        Email= email;
        Password= password;
    }
    public PersonalDetails()
    {

    }
}
