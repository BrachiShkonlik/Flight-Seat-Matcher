
namespace Services.Interface;

public interface IPassengerService : IService<PassengerDTO>
{
    /*Task<List<PassengerDTO>> GetPassengerAsync(int id);*/
    Task<PassengerDTO> GetPassengerByDetailsEndFlightCodeAsync(params string[] details);
    Task<List<PassengerDTO>> GetPassengerByFlightCodeAsync(string flightCode);
    Task<List<PassengerDTO>> GetPassengerByUserDetailsAsync(params string[] details);
    Task<bool> GetBooleanResponse(params string[] details);
 
}