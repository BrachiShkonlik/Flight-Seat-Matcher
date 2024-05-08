namespace LayeredArchitecture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightsController : ControllerBase
    {
        IFlightService FlightService;
        public FlightsController(IFlightService flightService)
        {
            FlightService = flightService;
        }
        #region Get function ------------------ working!!!!!!!!!!
        [HttpGet]
        public async Task<List<FlightDTO>> GetAllAsync()
        {
            return FlightService.GetAllAsync().Result;
        }

        [HttpGet("getFlightById")]
        public async Task<FlightDTO> GetFlightByIdAsync(int id)
        {
            return await FlightService.GetSingleAsync(id);
        }
        #endregion 

        #region Create function
        [HttpPost]
        public async Task<bool> CreateFlight(int id, string flightCode, DateTime date, string exit, string target, string company, int numberPlaces)
        {
            FlightDTO flightDTO = new(id, flightCode, date, exit, target, company, numberPlaces);
            return await FlightService.AddAsync(flightDTO);
        }
        #endregion

        #region Update function
        [HttpPut]
        public async Task<bool> UpdateClient(int id, string flightCode, DateTime date, string exit, string target, string company, int numberPlaces)
        {

            FlightDTO flightDTO = new(id, flightCode, date, exit, target, company, numberPlaces);
            return await FlightService.UpdateAsync(flightDTO);
        }
        #endregion

        #region Delete function
        [HttpDelete]
        public async Task<bool> DeletePassenger(string flightCode, string company)
        {
            string[] details = { flightCode, company };
            return await FlightService.DeleteAsync(details);
        }
        #endregion
    }
}
