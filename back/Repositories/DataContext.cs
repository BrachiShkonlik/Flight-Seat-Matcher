
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
        MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://BrachaShkolnik:Brachi0533104431@cluster0.bgkk2sl.mongodb.net/?authSource=admin");
        db = dbPlaceMatching.GetDatabase("PlaceMatching");
        PassengerCollection = db.GetCollection<Passenger>("passengers");
        PassengerWithFlightCollection = db.GetCollection<PassengerWithFlight>("passengersWithFlight");
        FlightCollection = db.GetCollection<Flight>("flights");
        DetailsCollection = db.GetCollection<PersonalDetails>("details");

    }
}
