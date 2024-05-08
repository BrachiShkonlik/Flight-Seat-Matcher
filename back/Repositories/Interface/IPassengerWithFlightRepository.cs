
namespace Repositories.Interface;

public interface IPassengerWithFlightRepository : IRepository<PassengerWithFlight>
{
    //Getall, Add, Update, Delete
    //GetByID, AddFlight, RemoveFlight
    Task<PassengerWithFlight> GetByEmailAndPasswordAsync(params string[] details);
    Task<bool> AddFlightAsync(FlightRegistration flight, params string[] details);
    Task<bool> RemoveFlightAsync(params string[] details);
    Task<bool> UpdateFlightAsync(FlightRegistration flight, params string[] details);
    Task<bool> GetBooleanResponseAsync(params string[] details);
    Task<List<PassengerWithFlight>> GetPassengersByFlightCodeAsync(string flightCode);




}
