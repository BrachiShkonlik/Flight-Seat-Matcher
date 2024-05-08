
namespace Repositories.Models;

public class PassengerWithFlight
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }//נדרשת הצפנה
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Birthday { get; set; }
    public int Gender { get; set; }
    public List<FlightRegistration> FlightsRegistration { get; set; }

    /*public PersonalDetails Details { get; set; }*/
    /*public List<string>? FlightCodes { get; set; }
    public List<Flight>? Flights { get; set; }*/
    
    

    public PassengerWithFlight(/*List<string> flightCodes*/ string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int gender)
    {
        FlightsRegistration = new List<FlightRegistration>();
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = gender;
    }
    public PassengerWithFlight(/*List<string> flightCodes*/ string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday)
    {
        FlightsRegistration = new List<FlightRegistration>();
        Email = email;
        Password = password;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Birthday = birthday;
        Gender = 0;
    }
    public PassengerWithFlight(/*List<string> flightCodes*/ List<FlightRegistration> flights, string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday, int gender)
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
    public PassengerWithFlight(/*List<string> flightCodes*/ List<FlightRegistration> flights, string email, string password, string firstName, string lastName, string phoneNumber, DateTime birthday)
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
    public PassengerWithFlight()
    {
        FlightsRegistration = new List<FlightRegistration>();
    }
}
