
namespace Repositories;

public interface IDataContext
{
    IMongoCollection<Passenger> PassengerCollection { get; set; }
    IMongoCollection<PassengerWithFlight> PassengerWithFlightCollection { get; set; }
    IMongoCollection<Flight> FlightCollection { get; set; }
    IMongoCollection<PersonalDetails> DetailsCollection { get; set; }
}
