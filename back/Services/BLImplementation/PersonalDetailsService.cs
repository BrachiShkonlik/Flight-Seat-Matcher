
namespace Services.BLImplementation;

public class PersonalDetailsService : IPersonalDetailsService
{
    IPersonalDetailsRepository _personalDetailsRepo;
    IMapper _mapper;

    public PersonalDetailsService(IPersonalDetailsRepository personalDetailsRepo, IMapper mapper)
    {
        _personalDetailsRepo = personalDetailsRepo;
        _mapper = mapper;
    }

    #region Create function
    public async Task<bool> AddAsync(PersonalDetailsDTO objectToAdd)
    {
        return await _personalDetailsRepo.AddAsync(Convertion.SimpleAutoMapper<PersonalDetails, PersonalDetailsDTO>(objectToAdd));
    }
    #endregion

    #region Delete function
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            return await _personalDetailsRepo.DeleteAsync(details);
        }
        return false;
    }
    #endregion

    #region Get function 
    public async Task<List<PersonalDetailsDTO>> GetAllAsync()
    {
        List<PersonalDetails> passengers = await _personalDetailsRepo.GetAllAsync();
        return _mapper.Map<List<PersonalDetailsDTO>>(passengers);
    }

    public async Task<PersonalDetailsDTO> GetSingleAsync(params string[] details)
    {
        return _mapper.Map<PersonalDetailsDTO>(await _personalDetailsRepo.GetSingleAsync(details));
    }

    #endregion

    #region Updete function
    public async Task<bool> UpdateAsync(PersonalDetailsDTO objectToUpdate)
    {
        if (objectToUpdate != null)
        {
            PersonalDetailsDTO? p = _mapper.Map<PersonalDetailsDTO>(objectToUpdate);
            return await _personalDetailsRepo.UpdateAsync(Convertion.SimpleAutoMapper<PersonalDetails, PersonalDetailsDTO>(objectToUpdate));
        }
        return false;
    }

    #endregion
}
