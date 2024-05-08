
namespace Services.Interface;

public interface IFlightService : IService<FlightDTO>
{
    Task<FlightDTO> GetSingleAsync(string flightCode);
}
