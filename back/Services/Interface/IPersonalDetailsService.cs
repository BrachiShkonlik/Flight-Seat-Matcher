
namespace Services.Interface;

public interface IPersonalDetailsService : IService<PersonalDetailsDTO>
{
    Task<PersonalDetailsDTO> GetSingleAsync(params string[] details);
}
