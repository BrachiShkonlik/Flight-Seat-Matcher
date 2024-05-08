
namespace Services.DTO;

public class FlightDTO
{
    public string FlightCode { get; set; }
    public string? Exit { get; set; }
    public string? Target { get; set; }
    public string? Company { get; set; }
    public int NumberPlaces { get; set; }
    //public List<Passenger> Passengers { get; set; }
    //public List<string> PassengersId { get; set; }
    public DateTime Date { get; set; }

    public FlightDTO(string flightCode, DateTime date, string exit, string target, string company, int numberPlaces)
    {
        FlightCode = flightCode;
        Date = date;
        Exit = exit;
        Target = target;
        Company = company;
        NumberPlaces = numberPlaces;
    }


    public FlightDTO(string flightCode, string company)
    {
        FlightCode = flightCode;
        Company = company;
    }

    public FlightDTO()
    {
    }
}
