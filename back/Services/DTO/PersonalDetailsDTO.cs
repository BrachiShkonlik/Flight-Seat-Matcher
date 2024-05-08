
namespace Services.DTO;

public class PersonalDetailsDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Birthday { get; set; }
    //public int? Gender { get; set; }

    
    public PersonalDetailsDTO(string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int? gender)
    {
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        //Gender = gender;
    }

    public PersonalDetailsDTO(string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday)
    {
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
    }
    public PersonalDetailsDTO()
    {

    }
}
