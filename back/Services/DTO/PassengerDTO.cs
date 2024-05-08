
namespace Services.DTO;

public class PassengerDTO
{
    public PersonalDetailsDTO? Details { get; set; } 
    public string? FlightCode { get; set; }
    public FlightDTO? Flight { get; set; }
    public string? FavoriteSomeoneFirstName { get; set; }
    public string? FavoriteSomeoneLastName { get; set; }
    public string? Preferred { get; set; }
    public string? Place { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }//נדרשת הצפנה
  
    public PassengerDTO( string flightCode ,string favoriteFname ,string favoriteLname , string prefered ,string email , string password)
    {
        FlightCode= flightCode;
        FavoriteSomeoneFirstName= favoriteFname;
        FavoriteSomeoneLastName= favoriteLname;
        Preferred= prefered;
        Email= email;
        Password= password;
    }
    public PassengerDTO( PersonalDetailsDTO details, string flightCode, FlightDTO flightDTO, string favoriteFname, string favoriteLname, string prefered, string email, string password)
    {
        Details = details;
        FlightCode = flightCode;
        Flight = flightDTO;
        FavoriteSomeoneFirstName= favoriteFname;
        FavoriteSomeoneLastName= favoriteLname;
        Preferred= prefered;
        Email= email;
        Password= password;

    }

    public PassengerDTO(PersonalDetailsDTO details, string flightCode, FlightDTO flightDTO,
        string favoriteFname, string favoriteLname, string prefered, string place, string email, string password)
    {
        Details = details;
        FlightCode = flightCode;
        Flight = flightDTO;
        FavoriteSomeoneFirstName = favoriteFname;
        FavoriteSomeoneLastName = favoriteLname;
        Preferred = prefered;
        Place= place;   
        Email = email;
        Password = password;
    }
    public PassengerDTO()
    {
    }
}


