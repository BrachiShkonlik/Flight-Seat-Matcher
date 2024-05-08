
namespace Services.DTO;

public class FlightRegistrationDTO
{
    public string FlightCode { get; set; }
    public FlightDTO? Flight { get; set; }
    public string? FavoriteSomeoneFirstName { get; set; }
    public string? FavoriteSomeoneLastName { get; set; }
    public string? Preferred { get; set; }

    public FlightRegistrationDTO(string flightCode, string favoriteSomeoneFirstName, string favoriteSomeoneLastName, string preferred)
    {
        FlightCode = flightCode;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
        Preferred = preferred;
    }

    public FlightRegistrationDTO(string flightCode, string favoriteSomeoneFirstName, string favoriteSomeoneLastName)
    {
        FlightCode = flightCode;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
    }

    public FlightRegistrationDTO(string flightCode, string preferred)
    {
        FlightCode = flightCode; Preferred = preferred;
    }

    public FlightRegistrationDTO(string flightCode, FlightDTO flight, string favoriteSomeoneFirstName, string favoriteSomeoneLastName, string preferred)
    {
        FlightCode = flightCode;
        Flight = flight;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
        Preferred = preferred;
    }

    public FlightRegistrationDTO(string flightCode, FlightDTO flight, string favoriteSomeoneFirstName, string favoriteSomeoneLastName)
    {
        FlightCode = flightCode;
        Flight = flight;
        FavoriteSomeoneFirstName = favoriteSomeoneFirstName;
        FavoriteSomeoneLastName = favoriteSomeoneLastName;
    }

    public FlightRegistrationDTO(string flightCode, FlightDTO flight, string preferred)
    {
        FlightCode = flightCode;
        Flight = flight;
        Preferred = preferred;
    }
    public FlightRegistrationDTO()
    {
    }
}

