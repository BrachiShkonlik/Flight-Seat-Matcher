namespace UI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonalDetailsController : ControllerBase
{
    IPersonalDetailsService _personalDetailsService;
    public PersonalDetailsController(IPersonalDetailsService personalDetailsService)
    {
        _personalDetailsService = personalDetailsService;
    }

    #region Get function 
    [HttpGet]
    public List<PersonalDetailsDTO> GetAll()
    {
        return _personalDetailsService.GetAllAsync().Result;
    }

    [HttpPost("getPersonalDetails")]
    public async Task<PersonalDetailsDTO> GetFlightByIdAsync(User user)
    {
        string[] details = { user.Email, user.Password };
        return await _personalDetailsService.GetSingleAsync(details);
    }
    

    #endregion

    #region Create function
    [HttpPost]
    public async Task<bool> CreatePassenger(PersonalDetailsDTO details)
    {
        PersonalDetailsDTO detailsDTO = new(details.Email, details.Password, details.FirstName, details.LastName, details.PhoneNumber, details.Birthday);
        return await _personalDetailsService.AddAsync(detailsDTO);
    }
    #endregion

    #region Update function

    [HttpPut]
    public async Task<bool> UpdatePassenger(PersonalDetailsDTO details)
    {
        PersonalDetailsDTO detailsDTO = new(details.Email, details.Password, details.FirstName, details.LastName, details.PhoneNumber, details.Birthday);
        return await _personalDetailsService.UpdateAsync(detailsDTO);
    }

    #endregion

    #region Delete function
    [HttpDelete]
    public async Task<bool> DeletePassenger(User user)
    {
        string[] details = { user.Email, user.Password };
        return await _personalDetailsService.DeleteAsync(details);
    }
    #endregion

}

