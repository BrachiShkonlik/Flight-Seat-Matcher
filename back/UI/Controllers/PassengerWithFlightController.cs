
namespace UI.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class PassengerWithFlightController : ControllerBase
    {
        IPassengerWithFlightService _passengerWithFlightService;
    public PassengerWithFlightController(IPassengerWithFlightService passengerWithFlightService)
    {
        _passengerWithFlightService = passengerWithFlightService;
    }

    #region Get function 
    [HttpGet]
    public List<PassengerWithFlightDTO> GetAllAsync()
    {
        return _passengerWithFlightService.GetAllAsync().Result;
    }

    [HttpPost("getPassenger")]
    public async Task<PassengerWithFlightDTO> GetByEmailAndPasswordAsync(User user)
    {
        string[] details = { user.Email, user.Password};
        return await _passengerWithFlightService.GetByEmailAndPasswordAsync(details);
    }
    #endregion

    #region Create function
    [HttpPost]
    public async Task<bool> CreatePassenger(PassengerWithFlightDTO passenger)
    {
        PassengerWithFlightDTO passengerDTO;
        List<FlightRegistrationDTO> flightRegistrationDTOs = passenger.FlightsRegistration;
        passengerDTO = new(flightRegistrationDTOs, passenger.Email, passenger.Password, passenger.FirstName, 
                        passenger.LastName, passenger.PhoneNumber, passenger.Birthday, passenger.Gender);
        return await _passengerWithFlightService.AddAsync(passengerDTO);

    }

    [HttpPost("addFlight")]
    public async Task<bool> AddFlight(PostData data)
    {
        if (data == null) {  return false; }
        if (data.FlightRegistration.FlightCode == null) { return false; }
        string[] details = {data.User.Email, data.User.Password};
        return await _passengerWithFlightService.AddFlightAsync(data.FlightRegistration, details);

    }

    [HttpPost("checking")]
    // return false - if is exsist,
    // true - if is not exsist.
    public async Task<bool> GetBooleanResponse(User user)
    {
        string[] details = { user.Email, user.Password, user.FlightCode };
        return await _passengerWithFlightService.GetBooleanResponse(details);

    }
    #endregion

    #region Update function
    [HttpPut]
    public async Task<bool> UpdatePassenger(PassengerWithFlightDTO passenger)
    {
        PassengerWithFlightDTO passengerDTO;
        passengerDTO = new(passenger.FlightsRegistration, passenger.Email, passenger.Password, passenger.FirstName,
                    passenger.LastName, passenger.PhoneNumber, passenger.Birthday, passenger.Gender);
        return await _passengerWithFlightService.UpdateAsync(passengerDTO);
    }

    [HttpPost("updateFlight")]
    public async Task<bool> UpdateFlight(PostData data)
    {
        if (data == null) { return false; }
        if (data.FlightRegistration.FlightCode == null) { return false; }
        string[] details = { data.User.Email, data.User.Password , data.User.FlightCode};
        return await _passengerWithFlightService.UpdateFlight(data.FlightRegistration, details);
    }

    #endregion

    #region Delete function
    [HttpPost("delete")]
    public async Task<bool> DeletePassenger(User user)
    {
        string[] details = { user.Email, user.Password};
        return await _passengerWithFlightService.DeleteAsync(details);
    }

    [HttpPost("removeFlight")]
    public async Task<bool> RemoveFlight(User user)
    {
        string[] details = { user.Email, user.Password, user.FlightCode };
        return await _passengerWithFlightService.RemoveFlightAsync(details);
    }
    #endregion

}





