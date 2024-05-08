
namespace UI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PassengeresController : ControllerBase
{
    IPassengerService _passengerService;
    public PassengeresController(IPassengerService passengerService)
    {
        _passengerService = passengerService;
    }

    #region Get function 
    [HttpGet]
    public List<PassengerDTO> GetAllAsync()
    {
        return _passengerService.GetAllAsync().Result;
    }

    [HttpPost("getPassenger")]
    public async Task<PassengerDTO> GetPassengerByDetailsEndFlightCodeAsync(User user)
    {
        string[] details = { user.Email, user.Password, user.FlightCode};
        return await _passengerService.GetPassengerByDetailsEndFlightCodeAsync(details);

    }

    /*[HttpGet("getPassengerById")]
    public async Task<List<PassengerDTO>> GetPassengerAsync(int id)
    {
        return _passengerService.GetPassengerAsync(id).Result;
    }*/

    [HttpGet("getPassengerByFlightCode")]
    public async Task<List<PassengerDTO>> GetPassengerByFlightCodeAsync(string flightCode)
    {
        return await _passengerService.GetPassengerByFlightCodeAsync(flightCode);
    }

    [HttpPost("checking")]
    public async Task<bool> GetBooleanResponse(User user)
    {
        string[] details = { user.Email, user.Password, user.FlightCode };
        return await _passengerService.GetBooleanResponse(details);
        
        
    }

    [HttpPost("-")]
    public async Task<List<PassengerDTO>> GetPassengerUserNameEndPassword(User user)
    {
        string[] details = { user.Email, user.Password };
        return await _passengerService.GetPassengerByUserDetailsAsync(details);
    }
    #endregion

    #region Create function
    [HttpPost]
    public async Task<bool> CreatePassenger(PassengerDTO passenger)
    {
        PassengerDTO passengerDTO = new(passenger.FlightCode,
            passenger.FavoriteSomeoneFirstName, passenger.FavoriteSomeoneLastName, passenger.Preferred, passenger.Email, passenger.Password);
        return await _passengerService.AddAsync(passengerDTO);

    }
    #endregion

    #region Update function
    [HttpPut]
    public async Task<bool> UpdatePassenger(PassengerDTO passenger)
    {
        PassengerDTO passengerDTO = new(passenger.FlightCode,
        passenger.FavoriteSomeoneFirstName, passenger.FavoriteSomeoneLastName, passenger.Preferred, passenger.Email, passenger.Password);
        return await _passengerService.UpdateAsync(passengerDTO);
    }

    #endregion

    #region Delete function
    [HttpPost("delete")]
    public async Task<bool> DeletePassenger(User user)
    {
        if (user.FlightCode == null) { return false; }
        string[] details = { user.Email, user.Password, user.FlightCode };
        return await _passengerService.DeleteAsync(details);
    }
    #endregion

}


