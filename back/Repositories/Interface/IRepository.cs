
namespace Repositories.Interface;

public interface IRepository<T>
{
    Task<List<T>> GetAllAsync();

    Task<bool> AddAsync(T objectToUpdate);

    Task<bool> UpdateAsync(T objectToUpdate);

    Task<bool> DeleteAsync(params string[] details);
}
