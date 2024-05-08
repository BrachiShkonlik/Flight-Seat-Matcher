
namespace Repositories.Interface;

public interface IPersonalDetailsRepository : IRepository<PersonalDetails>
{
    Task<PersonalDetails> GetSingleAsync(params string[] details);
}
