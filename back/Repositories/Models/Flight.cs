
namespace Repositories.Models;

public class Flight
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _Id { get; set; }
    public string FlightCode { get; set; }
    public string Exit { get; set; }
    public string Target { get; set; }
    public string Company { get; set; }
    public int NumberPlaces { get; set; }
    public DateTime Date { get; set; }

    public Flight(string flightCode, DateTime date, string exit, string target, string company, int numberPlaces)
    {
        FlightCode = flightCode;
        Date = date;
        Exit = exit;
        Target = target;
        Company = company;
        NumberPlaces = numberPlaces;
        
    }

    public Flight(string flightCode, DateTime date, string exit, string target, string company, int numberPlaces, List<Passenger> passengers, List<string> passengersId)
    {
        FlightCode = flightCode;
        Date = date;
        Exit = exit;
        Target = target;
        Company = company;
        NumberPlaces = numberPlaces;
        
    }


    public Flight(int id, string flightCode, string company)
    {
        FlightCode = flightCode;
        Company = company;
    }

    public Flight()
    { 
    }

}
