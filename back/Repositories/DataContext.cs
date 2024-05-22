
namespace Repositories;

public class DataContext : IDataContext
{
    private readonly IMongoDatabase db;
    public IMongoCollection<Passenger> PassengerCollection { get; set; }
    public IMongoCollection<PassengerWithFlight> PassengerWithFlightCollection { get; set; }
    public IMongoCollection<Flight> FlightCollection { get; set; }
    public IMongoCollection<PersonalDetails> DetailsCollection { get; set; }

    public DataContext()
    {
        MongoClient dbPlaceMatching = new MongoClient("connection string");
        db = dbPlaceMatching.GetDatabase("placeMatchingDB");
        PassengerCollection = db.GetCollection<Passenger>("passengers");
        PassengerWithFlightCollection = db.GetCollection<PassengerWithFlight>("PassengersWithFlights");
        FlightCollection = db.GetCollection<Flight>("Flights");
        DetailsCollection = db.GetCollection<PersonalDetails>("details");

    }
}
