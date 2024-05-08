namespace UI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlightsController : ControllerBase
{
    IFlightService _flightService;
    public FlightsController(IFlightService flightService)
    {
        _flightService = flightService;
    }

    #region Get function
    [HttpGet]
    public async Task<List<FlightDTO>> GetAllAsync()
    {
        return await _flightService.GetAllAsync();
    }

    [HttpGet("getFlightByFlightCode")]
    public async Task<FlightDTO> GetFlightByIdAsync(string flightCode)
    {
        return await _flightService.GetSingleAsync(flightCode);
    }
    #endregion 

    #region Create function
    [HttpPost]
    public async Task<bool> CreateFlight(FlightDTO flight)
    {
        FlightDTO flightDTO = new(flight.FlightCode, flight.Date, flight.Exit, flight.Target, flight.Company, flight.NumberPlaces);
        return await _flightService.AddAsync(flightDTO);
    }
    #endregion

    #region Update function
    [HttpPut]
    public async Task<bool> UpdateClient(string flightCode, DateTime date, string exit, string target, string company, int numberPlaces)
    {

        FlightDTO flightDTO = new(flightCode, date, exit, target, company, numberPlaces);
        return await _flightService.UpdateAsync(flightDTO);
    }
    #endregion

    #region Delete function
    [HttpDelete]
    public async Task<bool> DeletePassenger(string flightCode, string company)
    {
        string[] details = { flightCode, company };
        return await _flightService.DeleteAsync(details);
    }
    #endregion
}
