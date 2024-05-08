
namespace Services.Interface;

public interface IPassengerWithFlightService : IService<PassengerWithFlightDTO>
{
    Task<PassengerWithFlightDTO> GetByEmailAndPasswordAsync(params string[] details);
    Task<bool> AddFlightAsync(FlightRegistrationDTO flight, params string[] details);
    Task<bool> RemoveFlightAsync(params string[] details);
    Task<bool> UpdateFlight(FlightRegistrationDTO flight, params string[] details);
    Task<bool> GetBooleanResponse(params string[] details);
    Task<List<PassengerWithFlightDTO>> GetPassengersByFlightCodeAsync(string flightCode);
}
