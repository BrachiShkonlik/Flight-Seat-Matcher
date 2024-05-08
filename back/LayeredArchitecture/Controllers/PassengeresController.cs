
namespace LayeredArchitecture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PassengeresController : ControllerBase
    {
        IPassengerService passengerService;
        public PassengeresController(IPassengerService passengerService)
        {
            this.passengerService = passengerService;
        }

        #region Get function ------------------ working!!!!!!!!!!
        [HttpGet]
        public async Task<List<PassengerDTO>> GetAllAsync()
        {
            return passengerService.GetAllAsync().Result;
        }

        [HttpGet("getPassenger")]
        public async Task<PassengerDTO> GetPassengerByIdEndCodeAsync(int id, string flightCode)
        {
            return await passengerService.GetPassengerByIdAsync(id, flightCode);
        }

        [HttpGet("getPassengerById")]
        public async Task<List<PassengerDTO>> GetPassengerAsync(int id)
        {
            return passengerService.GetPassengerAsync(id).Result;
        }
        #endregion 

        #region Create function
        [HttpPost]
        public async Task<bool> CreatePassenger(int id, string firstName, string lastName, string phoneNumber, string email,
            int theClass, string flightCode, /*Passenger favoriteSomeone, */string preferred, int age,
            string userName, string password)
        {
            PassengerDTO passengerDTO = new(id, firstName, lastName, phoneNumber, email, theClass, flightCode, preferred, age, userName, password);
            return await passengerService.AddAsync(passengerDTO);
        }
        #endregion

        #region Update function
        [HttpPut]
        public async Task<bool> UpdatePassenger(int id, string firstName, string lastName, string phoneNumber, string email,
            int theClass, Passenger favoriteSomeone, string preferred, int age,
            string userName, string password)
        {

            //PassengerDTO passengerDTO = new(id, firstName, email, lastName, password, theClass, favoriteSomeone, preferred, age, userName, phoneNumber);
            //return await passengerService.UpdateAsync(passengerDTO);
            return false;
        }
        #endregion

        #region Delete function
        [HttpDelete]
        public async Task<bool> DeletePassenger(string userName, string password, int id, string flightCode)
        { 
            string[] details = {userName, password , id.ToString(), flightCode};
            return await passengerService.DeleteAsync(details);
        }
        #endregion
    }
}

