
namespace Services.BLImplementation;

public class PassengerService : IPassengerService
{
    IPassengerRepository _passengerRepo;
    IMapper _mapper;
    
    public PassengerService(IPassengerRepository passengerRepo, IMapper mapper)
    {
        _passengerRepo = passengerRepo;
        _mapper = mapper;
    }

    #region Create functions
    public async Task<bool> AddAsync(PassengerDTO objectToAdd)
    {
        /*List<Passenger> passengers = await PassengerRepo.AddAsync();
        return Mapper.Map<List<PassengerDTO>>(passengers);*/
        return await _passengerRepo.AddAsync(Convertion.SimpleAutoMapper<Passenger, PassengerDTO>(objectToAdd));
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
    #endregion

    #region Get function
    public async Task<List<PassengerDTO>> GetAllAsync()
    {
        List<Passenger> passengers = await _passengerRepo.GetAllAsync();
        return _mapper.Map<List<PassengerDTO>>(passengers);
    }
    /*public async Task<List<PassengerDTO>> GetPassengerByDetailsEndFlightCodeAsync(int id)
    {
        List<Passenger> passengers = await PassengerRepo.GetPassengerAsync(id);
        return Mapper.Map<List<PassengerDTO>>(passengers);
    }*/
    public async Task<List<PassengerDTO>> GetPassengerByFlightCodeAsync(string flightCode)
    {
        List<Passenger> passengers = await _passengerRepo.GetPassengerByFlightCodeAsync(flightCode);
        return _mapper.Map<List<PassengerDTO>>(passengers);
    }
    public async Task<PassengerDTO> GetPassengerByDetailsEndFlightCodeAsync(params string[] details)
    {
        return _mapper.Map<PassengerDTO>(await _passengerRepo.GetPassengerByDetailsEndFlightCodeAsync(details));
    }
    public async Task<List<PassengerDTO>> GetPassengerByUserDetailsAsync(params string[] details)
    {
            List<Passenger> passengers = await _passengerRepo.GetPassengerByUserDetailsAsync(details);
            return _mapper.Map<List<PassengerDTO>>(passengers);
    }

    public async Task<bool> GetBooleanResponse(params string[] details)
    {
        return await _passengerRepo.GetBooleanResponse(details);
    }


    #endregion

    #region Update function
    public async Task<bool> UpdateAsync(PassengerDTO objectToUpdate)
    {
        if (objectToUpdate != null)
        {
            PassengerDTO? p = _mapper.Map<PassengerDTO>(objectToUpdate);
            return await _passengerRepo.UpdateAsync(Convertion.SimpleAutoMapper<Passenger, PassengerDTO>(objectToUpdate));
        }
        return false;
        
    }


    #endregion
}
