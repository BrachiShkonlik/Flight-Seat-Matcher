

namespace Repositories.Models;

public class FlightRegistration
{
    public string FlightCode { get; set; }
    public Flight? Flight { get; set; }
    public string? FavoriteSomeoneFirstName { get; set; }
    public string? FavoriteSomeoneLastName { get; set; }
    public string? Preferred { get; set; }

    public FlightRegistration(string flightCode, string favoriteSomeoneFirstName, string favoriteSomeoneLastName, string preferred)
    {
        FlightCode = flightCode;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
        Preferred = preferred;
    }

    public FlightRegistration(string flightCode, string favoriteSomeoneFirstName, string favoriteSomeoneLastName)
    {
        FlightCode = flightCode;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
    }

    public FlightRegistration(string flightCode, string preferred)
    {
        FlightCode = flightCode; Preferred = preferred;
    }

    public FlightRegistration(string flightCode, Flight flight, string favoriteSomeoneFirstName, string favoriteSomeoneLastName, string preferred)
    {
        FlightCode = flightCode;
        Flight = flight;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
        Preferred = preferred;
    }

    public FlightRegistration(string flightCode, Flight flight, string favoriteSomeoneFirstName, string favoriteSomeoneLastName)
    {
        FlightCode = flightCode;
        Flight = flight;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
    }

    public FlightRegistration(string flightCode, Flight flight, string preferred)
    {
        FlightCode = flightCode; 
        Flight = flight;
        Preferred = preferred;
    }
    public FlightRegistration()
    {
    }
}
