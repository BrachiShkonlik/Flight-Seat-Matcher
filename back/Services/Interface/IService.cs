
namespace Services.Interface;

public interface IService<T>
{
    Task<List<T>> GetAllAsync();

    Task<bool> AddAsync(T objectToUpdate);

    Task<bool> UpdateAsync(T objectToUpdate);

    Task<bool> DeleteAsync(params string[] details);
}
