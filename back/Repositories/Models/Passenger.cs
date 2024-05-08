namespace Repositories.Models;

public class Passenger
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _Id { get; set; }
    public PersonalDetails Details { get; set; }
    public string FlightCode { get; set; }
    public Flight Flight { get; set; }
    public string? FavoriteSomeoneFirstName { get; set; }
    public string? FavoriteSomeoneLastName { get; set; }
    public string? Preferred { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }//נדרשת הצפנה

    public Passenger(string flightCode, string favoriteFirstName, string favoriteLastName, string preferred, string email, string password)
    {
        FlightCode= flightCode;
        FavoriteSomeoneFirstName= favoriteFirstName;
        FavoriteSomeoneLastName= favoriteLastName;
        Preferred= preferred;
        Email= email;
        Password= password;
    }
    public Passenger(PersonalDetails personalDetails, string flightCode, Flight flight, 
        string favoriteFirstName, string favoriteLastName, string preferred, string email, string password)
    {
        Details = personalDetails;
        FlightCode= flightCode;
        Flight = flight;
        FavoriteSomeoneFirstName= favoriteFirstName;
        FavoriteSomeoneFirstName= favoriteFirstName;
        Preferred= preferred;
        Email= email;
        Password= password;
    }
    public Passenger()
    {
    }
}
