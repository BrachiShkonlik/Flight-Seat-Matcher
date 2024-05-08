
namespace Services.BLImplementation;

public class PassengerWithFlightService : IPassengerWithFlightService
{
    IPassengerWithFlightRepository _passengerRepo;
    IMapper _mapper;

    public PassengerWithFlightService(IPassengerWithFlightRepository passengerRepo, IMapper mapper)
    {
        _passengerRepo = passengerRepo;
        _mapper = mapper;
    }

    #region Create functions
    public async Task<bool> AddAsync(PassengerWithFlightDTO objectToAdd)
    {
        PassengerWithFlight p = _mapper.Map<PassengerWithFlight>(objectToAdd);
        return await _passengerRepo.AddAsync(p);
    }

    public async Task<bool> AddFlightAsync(FlightRegistrationDTO flight, params string[] details)
    {
        if (details != null)
        {
            FlightRegistration? f = _mapper.Map<FlightRegistration>(flight);
            return await _passengerRepo.AddFlightAsync(f, details);
        }
        return false;

    }

    public async Task<bool> GetBooleanResponse(params string[] details)
    {
        if (details != null) { return await _passengerRepo.GetBooleanResponseAsync(details); }
        return false;
    }
    #endregion

    #region Delete functiona
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            return await _passengerRepo.DeleteAsync(details);
        }
        return false;
    }

    public async Task<bool> RemoveFlightAsync(params string[] details)
    {
        if (details != null)
        {
            return await _passengerRepo.RemoveFlightAsync(details);
        }
        return false;
    }
    #endregion

    #region Get function
    public async Task<List<PassengerWithFlightDTO>> GetAllAsync()
    {
        List<PassengerWithFlight> passengers = await _passengerRepo.GetAllAsync();
        return _mapper.Map<List<PassengerWithFlightDTO>>(passengers);
    }

    public async Task<PassengerWithFlightDTO> GetByEmailAndPasswordAsync(params string[] details)
    {
        return _mapper.Map<PassengerWithFlightDTO>(await _passengerRepo.GetByEmailAndPasswordAsync(details));
    }

    public async Task<List<PassengerWithFlightDTO>> GetPassengersByFlightCodeAsync(string flightCode)
    {
        List<PassengerWithFlight> passengers = await _passengerRepo.GetPassengersByFlightCodeAsync(flightCode);
        return _mapper.Map<List<PassengerWithFlightDTO>>(passengers);
    }


    #endregion

    #region Update function
    public async Task<bool> UpdateAsync(PassengerWithFlightDTO objectToUpdate)
    {
        if (objectToUpdate != null)
        {
           PassengerWithFlight p = _mapper.Map<PassengerWithFlight>(objectToUpdate);
           return await _passengerRepo.UpdateAsync(p);
        }
        return false;

    }

    public async Task<bool> UpdateFlight(FlightRegistrationDTO flight, params string[] details)
    {
        if (details != null)
        {
            FlightRegistration? f = _mapper.Map<FlightRegistration>(flight);
            return await _passengerRepo.UpdateFlightAsync(f, details);
        }
        return false;
    }


    #endregion
}
