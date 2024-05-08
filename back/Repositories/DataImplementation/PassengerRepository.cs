
namespace Repositories.DataImplementation;
public class PassengerRepository : IPassengerRepository
{ 
    private IMongoCollection<Passenger> PassengerCollection { get; }
    private IMongoCollection<Flight> FlightCollection { get; }
    private IMongoCollection<PersonalDetails> DetailsCollection { get; }
    
    public PassengerRepository(IDataContext db)
    { 
        PassengerCollection = db.PassengerCollection;
        FlightCollection = db.FlightCollection;
        DetailsCollection = db.DetailsCollection;
    }

    #region Create functions
    public async Task<bool> AddAsync(Passenger objectToAdd)
    {
        try
        {
            if (objectToAdd == null)
            {
                throw new ArgumentNullException("Passenger details are null");
            }
            await PassengerCollection.InsertOneAsync(objectToAdd);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    #endregion

    #region Delete functions
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            try
            {
                var isDeleted = await PassengerCollection.DeleteOneAsync(p => p.Email == details[0] && p.Password == details[1] && p.FlightCode == details[2]);
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

    #region Get functions
    public async Task<List<Passenger>> GetAllAsync()
    {

        try
        {
            List<Passenger> passengers = await PassengerCollection.AsQueryable<Passenger>().ToListAsync();
            foreach (var p in passengers)
            {
                Flight flight = await FlightCollection.Find(f => f.FlightCode == p.FlightCode).FirstOrDefaultAsync();
                p.Flight = flight;
                PersonalDetails details = await DetailsCollection.Find(d => d.Email == p.Email && d.Password == p.Password).FirstOrDefaultAsync();
                p.Details = details;
            }
            return passengers == null ? throw new ArgumentNullException("No passengers in our system") : passengers;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex);
            throw ex;
        }
        catch (TimeoutException ex) { throw ex; }

    }

    
    public async Task<Passenger> GetPassengerByDetailsEndFlightCodeAsync(params string[] details)
    {
        try
        {
            Passenger pass = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1] && pass.FlightCode == details[2]).FirstOrDefaultAsync();
            if (pass == null) { throw new ArgumentNullException("The passenger does'nt exist in our system"); }
            Flight flight = await FlightCollection.Find(f => f.FlightCode == details[2]).FirstOrDefaultAsync();
            pass.Flight = flight;
            PersonalDetails personalDetails = await DetailsCollection.Find(d => d.Email == details[0] && d.Password == details[1]).FirstOrDefaultAsync();
            pass.Details = personalDetails;

            return pass;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex.Message);
            throw ex;
        }
    }
    public async Task<List<Passenger>> GetPassengerByFlightCodeAsync(string flightCode)
    {
        try
        {
            List<Passenger> passengers = await PassengerCollection.AsQueryable<Passenger>().Where(pass => pass.FlightCode == flightCode).ToListAsync();
            foreach (var p in passengers)
            {
                Flight flight = await FlightCollection.Find(f => f.FlightCode == p.FlightCode).FirstOrDefaultAsync();
                p.Flight = flight;
                PersonalDetails details = await DetailsCollection.Find(d => d.Email == p.Email && d.Password == p.Password).FirstOrDefaultAsync();
                p.Details = details;
            }
            return passengers == null ? throw new ArgumentNullException("No passengers in our system") : passengers;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex);
            throw ex;
        }
        catch (TimeoutException ex) { throw ex; }
    }
    public async Task<List<Passenger>> GetPassengerByUserDetailsAsync(params string[] details)
    {
        if (details != null)
        {
            try
            {
                List<Passenger> passengers = await PassengerCollection.AsQueryable<Passenger>().Where(pass => pass.Email == details[0] && pass.Password == details[1]).ToListAsync();
                foreach (var p in passengers)
                {
                    Flight flight = await FlightCollection.Find(f => f.FlightCode == p.FlightCode).FirstOrDefaultAsync();
                    p.Flight = flight;
                    PersonalDetails personalDetails = await DetailsCollection.Find(d => d.Email == details[0] && d.Password == details[1]).FirstOrDefaultAsync();
                    p.Details = personalDetails;
                }
                return passengers == null ? throw new ArgumentNullException("No passengers in our system") : passengers;
            }
            catch (ArgumentNullException ex)
            {
                Debug.WriteLine(ex);
                throw ex;
            }
            catch (TimeoutException ex) { throw ex; }
        }
        return null;

    }

    public async Task<bool> GetBooleanResponse(params string[] details)
    {
        if(details != null)
        {
            try
            {
                Passenger pass = await PassengerCollection.Find(d => d.Email == details[0] && d.Password == details[1] && d.FlightCode == details[2]).FirstOrDefaultAsync();
                return pass == null;
            }
            catch (ArgumentNullException ex)
            {
                Debug.WriteLine(ex);
                throw ex;
            }
        }
        return false;
    }

    #endregion

    #region Update functions
    public async Task<bool> UpdateAsync(Passenger objectToUpdate)
    {
        try
        {
            Passenger p = await PassengerCollection.Find(pass => pass.Email == objectToUpdate.Email && pass.Password == objectToUpdate.Password && pass.FlightCode == objectToUpdate.FlightCode).FirstOrDefaultAsync();
            objectToUpdate._Id = p._Id;
            await PassengerCollection.ReplaceOneAsync(pass => pass.Email == objectToUpdate.Email && pass.Password == objectToUpdate.Password && pass.FlightCode == objectToUpdate.FlightCode
            , objectToUpdate);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }



    #endregion
}

