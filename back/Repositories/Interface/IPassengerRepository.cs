
namespace Repositories.Interface;

public interface IPassengerRepository : IRepository<Passenger>
{
   /*Task<List<Passenger>> GetPassengerAsync(int id);*/
   Task<Passenger> GetPassengerByDetailsEndFlightCodeAsync(params string[] details);
   Task<List<Passenger>> GetPassengerByFlightCodeAsync(string flightCode);
   Task<List<Passenger>> GetPassengerByUserDetailsAsync(params string[] details);
   Task<bool> GetBooleanResponse(params string[] details);

}