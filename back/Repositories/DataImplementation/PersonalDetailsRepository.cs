
namespace Repositories.DataImplementation;

public class PersonalDetailsRepository : IPersonalDetailsRepository
{
    private IMongoCollection<PersonalDetails> DetailsCollection { get; }

    public PersonalDetailsRepository(IDataContext db)
    {
        DetailsCollection = db.DetailsCollection;
    }

    #region Create functions
    public async Task<bool> AddAsync(PersonalDetails detailsToAdd)
    {
        try
        {
            if (detailsToAdd == null)
                throw new ArgumentNullException("The details are null");

            if (DetailsCollection
                .AsQueryable<PersonalDetails>()
                .Where(d => d.Email == detailsToAdd.Email && d.Password == detailsToAdd.Password)
                .FirstOrDefault() == null)
            {
                await DetailsCollection.InsertOneAsync(detailsToAdd);
                return true;
            }
            throw new Exception("This exists in the system");
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    #endregion

    #region Delete function
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            try
            {
                var isDeleted = await DetailsCollection.DeleteOneAsync(p => p.Email == details[0] && p.Password == details[1]);
                if (isDeleted.DeletedCount > 0) { return true; }
                return false;
            }
            catch (ArgumentNullException ex)
            {
                Debug.WriteLine(ex.Message);
                throw ex;
            }
        }
        return false;
    }
    #endregion

    #region Get function
    public async Task<List<PersonalDetails>> GetAllAsync()
    {
        try
        {
            List<PersonalDetails> details = await DetailsCollection.Find(_ => true).ToListAsync();
            return details == null ? throw new ArgumentNullException("No details in our system") : details;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex);
            throw ex;
        }
        catch (TimeoutException ex) { throw ex; }
    }

    public async Task<PersonalDetails> GetSingleAsync(params string[] details)
    {
        try
        {
            PersonalDetails pd = await DetailsCollection.Find(d => d.Email == details[0] && d.Password == details[1]).FirstOrDefaultAsync();
            /*if (pd == null)
            {
                throw new ArgumentNullException("The flight does'nt exist in our system");
            }*/
            return pd;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex.Message);
            throw ex;
        }

    }
    #endregion

    #region Update function
    public async Task<bool> UpdateAsync(PersonalDetails objectToUpdate)
    {
        try
        {
            PersonalDetails d = await DetailsCollection.Find(d => d.Email == d.Email && d.Password == objectToUpdate.Password).FirstOrDefaultAsync();
            objectToUpdate._Id = d._Id;
            await DetailsCollection.ReplaceOneAsync(f => d.Email == d.Email && d.Password == objectToUpdate.Password, objectToUpdate);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    #endregion
}
