
namespace Services.BLImplementation;

public class FlightService : IFlightService
{
    IFlightRepository _flightRepo;
    IMapper _mapper;
    public FlightService(IFlightRepository flightRepo, IMapper mapper)
    {
        _flightRepo = flightRepo;
        _mapper = mapper;
    }

    #region Create function
    public async Task<bool> AddAsync(FlightDTO objectToAdd)
    {
        return await _flightRepo.AddAsync(Convertion.SimpleAutoMapper<Flight, FlightDTO>(objectToAdd));
    }
    #endregion

    #region Delete function
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            return await _flightRepo.DeleteAsync(details);
        }
        return false;
    }
    #endregion

    #region Get function
    public async Task<List<FlightDTO>> GetAllAsync()
    {
        List<Flight> flights = await _flightRepo.GetAllAsync();
        List<FlightDTO> flightDTOs = new List<FlightDTO>();
        flights.ForEach(flight => {
            FlightDTO f = _mapper.Map<Flight, FlightDTO>(flight);
            flightDTOs.Add(f);
            });
        return flightDTOs;
    }

    public async Task<FlightDTO> GetSingleAsync(string flightCode)
    {
        return _mapper.Map<FlightDTO>(await _flightRepo.GetSingleAsync(flightCode));
    }
    #endregion

    #region Update function
    public async Task<bool> UpdateAsync(FlightDTO objectToUpdate)
    {
        if (objectToUpdate != null)
        {
            FlightDTO? p = _mapper.Map<FlightDTO>(objectToUpdate);
            return await _flightRepo.UpdateAsync(Convertion.SimpleAutoMapper<Flight, FlightDTO>(objectToUpdate));
        }
        return false;
    }
    #endregion
}
