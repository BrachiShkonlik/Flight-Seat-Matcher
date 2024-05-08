
namespace Repositories.Interface;

public interface IFlightRepository : IRepository<Flight>
{
    Task<Flight> GetSingleAsync(string flightCode);
}
