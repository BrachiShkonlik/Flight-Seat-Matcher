
namespace Repositories.DataImplementation;

public class FlightRepository : IFlightRepository
{
    private IMongoCollection<Flight> FlightCollection { get; }
    private IMongoCollection<Passenger> PassengerCollection { get; }

    public FlightRepository(IDataContext db)
    {
        FlightCollection = db.FlightCollection;
        PassengerCollection = db.PassengerCollection;
    }

    #region Create functions
    // הפונקציה הזו בכלל לא צריכה להיות מאופשרת...
    public async Task<bool> AddAsync(Flight objectToAdd)
    {
        try
        {
            if (objectToAdd == null)
                throw new ArgumentNullException("Flight details are null");

            if (FlightCollection
                .AsQueryable<Flight>()
                .Where(f => f.FlightCode == objectToAdd.FlightCode)
                .FirstOrDefault() == null)
            {
                await FlightCollection.InsertOneAsync(objectToAdd);
                return true;
            }
            else
            {
                throw new Exception("This ID already exists in the system");
            }

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
            var isDeleted = await FlightCollection.DeleteOneAsync(f => f.FlightCode == details[0] && f.Company == details[1]);
            var filter = Builders<Passenger>.Filter
            .Eq(p => p.FlightCode, details[0]);
            var passengerForDelete = await PassengerCollection.DeleteManyAsync(filter);
            try
            {
                if (isDeleted.DeletedCount > 0 && passengerForDelete.DeletedCount > 0)
                    return true;
                return false;
            }
            catch (ArgumentNullException ex) { throw ex; }
        } return false;
    }
    #endregion

    #region Get functions
    public async Task<List<Flight>> GetAllAsync()
    {  try
        {
            List<Flight> flights = await FlightCollection.Find(_ => true).ToListAsync();
            return flights == null ? throw new ArgumentNullException("No flights in our system") : flights;
            
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex);
            throw ex;
        }
        catch (TimeoutException ex) { throw ex; }
    }
    public async Task<Flight> GetSingleAsync(string flightCode)
    {
        try
        {
            Flight flight = await FlightCollection.Find(f => f.FlightCode == flightCode).FirstOrDefaultAsync();
            if (flight == null)
            {
                throw new ArgumentNullException("The flight does'nt exist in our system");
            }
            return flight;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex.Message);
            throw ex;
        }

    }
    #endregion

    #region Update functions
    public async Task<bool> UpdateAsync(Flight objectToUpdate)
    {
        try
        {
            Flight f = await FlightCollection.Find(f => f.FlightCode == objectToUpdate.FlightCode).FirstOrDefaultAsync();
            objectToUpdate._Id = f._Id;
            await FlightCollection.ReplaceOneAsync(f => f.FlightCode == objectToUpdate.FlightCode, objectToUpdate);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }

    #endregion
}
