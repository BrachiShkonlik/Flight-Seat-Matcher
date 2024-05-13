
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
        /*MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://BrachaShkolnik:Brachi0533104431@cluster0.bgkk2sl.mongodb.net/?authSource=admin");*/
        /* MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://placeMatchingDB:Brachi0533104431@atlascluster.jjrp4pt.mongodb.net/");*/
        /*MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://b0533104431:w?+KDJG9Ws-.+5.@placematchingdb.gpjuhxr.mongodb.net/");*/
        //"mongodb+srv://b0533104431:@placematcw?+KDJG9Ws-.+5.hingdb.gpjuhxr.mongodb.net/?authSource=admin"
        /*MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://b0533104431:.w?+KDJG9Ws-.+5@placematchingdb.gpjuhxr.mongodb.net/?retryWrites=true&w=majority&appName=placeMatchingDB");*/
        /*MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://b0533104431:bhrecrht1@placematchingdb.gpjuhxr.mongodb.net/");*/
        MongoClient dbPlaceMatching = new MongoClient("mongodb+srv://b0533104431:placematching@placematchingdb.gpjuhxr.mongodb.net/");
        /*db = dbPlaceMatching.GetDatabase("PlaceMatching");*/
        db = dbPlaceMatching.GetDatabase("placeMatchingDB");
        PassengerCollection = db.GetCollection<Passenger>("passengers");
        PassengerWithFlightCollection = db.GetCollection<PassengerWithFlight>("PassengersWithFlights");
        FlightCollection = db.GetCollection<Flight>("Flights");
        DetailsCollection = db.GetCollection<PersonalDetails>("details");

    }
}
