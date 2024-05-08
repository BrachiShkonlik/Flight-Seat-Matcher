
namespace Services.DTO;

public class PassengerWithFlightDTO
{
    public string Email { get; set; }
    public string Password { get; set; } //נדרשת הצפנה
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Birthday { get; set; }
    public int Gender { get; set; }
    public List<FlightRegistrationDTO> FlightsRegistration { get; set; }
    

    public PassengerWithFlightDTO(string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int gender)
    {
        FlightsRegistration = new List<FlightRegistrationDTO>();
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = gender;
    }
    public PassengerWithFlightDTO(string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday)
    {
        FlightsRegistration = new List<FlightRegistrationDTO>();
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = 0;
    }
    public PassengerWithFlightDTO(List<FlightRegistrationDTO> flights, string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int gender)
    {
        FlightsRegistration = flights;
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = gender;
    }
    public PassengerWithFlightDTO(List<FlightRegistrationDTO> flights, string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday)
    {
        FlightsRegistration = flights;
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = 0;
    }
    /*public PassengerWithFlight(PersonalDetails personalDetails, List<FlightRegistration> flights, string email, string password)
    {
        Details = personalDetails;
        FlightsRegistration = flights;
        Email = email;
        Password = password;
    }*/
    public PassengerWithFlightDTO()
    {
        FlightsRegistration = new List<FlightRegistrationDTO>();
    }
}

