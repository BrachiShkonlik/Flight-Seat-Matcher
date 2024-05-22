namespace Repositories.DataImplementation;

public class PassengerWithFlightRepository : IPassengerWithFlightRepository
{
    private IMongoCollection<PassengerWithFlight> PassengerCollection { get; }
    private IMongoCollection<Flight> FlightCollection { get; }

    public PassengerWithFlightRepository(IDataContext db)
    {
        PassengerCollection = db.PassengerWithFlightCollection;
        FlightCollection = db.FlightCollection;
    }

    #region Passenger functions

    #region Create functions
    public async Task<bool> AddAsync(PassengerWithFlight passengerToAdd)
    {
        try
        {
            if (passengerToAdd == null)
            {
                throw new ArgumentNullException("Passenger details are null");
            }
            await PassengerCollection.InsertOneAsync(passengerToAdd);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }

    public async Task<bool> GetBooleanResponseAsync(params string[] details)
    {
        if (details == null) { throw new ArgumentNullException("Dont have a details"); }
        try
        {
            PassengerWithFlight pass = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1]).FirstOrDefaultAsync();
            FlightRegistration f = pass.FlightsRegistration.Find(f => f.FlightCode == details[2]);
            if (f != null) { return false; }
            return true;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex);
            throw ex;
        }
        catch (TimeoutException ex) { throw ex; }
    }
    #endregion

    #region Get function
    public async Task<List<PassengerWithFlight>> GetAllAsync()
    {
        try
        {
            List<PassengerWithFlight> passengers = await PassengerCollection.AsQueryable<PassengerWithFlight>().ToListAsync();
            foreach (var pass in passengers)
            {
                if (pass.FlightsRegistration != null)
                {
                    foreach (var flight in pass.FlightsRegistration)
                    {
                        if (flight != null)
                        {
                            Flight f = await FlightCollection.Find(flt => flt.FlightCode == flight.FlightCode).FirstOrDefaultAsync();
                            flight.Flight = f;
                        }
                    }
                }
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
    public async Task<PassengerWithFlight> GetByEmailAndPasswordAsync(params string[] details)
    {
        try
        {
            PassengerWithFlight pass = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1]).FirstOrDefaultAsync();
            if (pass == null) { return null; }
            if (pass.FlightsRegistration != null)
            {
                foreach (var flight in pass.FlightsRegistration)
                {
                    if (flight != null)
                    {
                        Flight f = await FlightCollection.Find(flt => flt.FlightCode == flight.FlightCode).FirstOrDefaultAsync();
                        flight.Flight = f;
                    }
                }
            }
            return pass;
        }
        catch (ArgumentNullException ex)
        {
            Debug.WriteLine(ex.Message);
            throw ex;
        }
    }

    #endregion

    #region Delete function
    public async Task<bool> DeleteAsync(params string[] details)
    {
        if (details != null)
        {
            try
            {
                var isDeleted = await PassengerCollection.DeleteOneAsync(p => p.Email == details[0] && p.Password == details[1]);
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

    #region Update function
    public async Task<bool> UpdateAsync(PassengerWithFlight objectToUpdate)
    {
        try
        {
            PassengerWithFlight p = await PassengerCollection.Find(pass => pass.Email == objectToUpdate.Email && pass.Password == objectToUpdate.Password).FirstOrDefaultAsync();
            objectToUpdate._Id = p._Id;
            await PassengerCollection.ReplaceOneAsync(pass => pass.Email == objectToUpdate.Email && pass.Password == objectToUpdate.Password, objectToUpdate);
            return true;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    #endregion

    #endregion

    #region Flight functions
    public async Task<bool> AddFlightAsync(FlightRegistration flight, params string[] details)
    {
        try
        {
            // TODO: check if passengers number == flight.Flight.NumberPlaces
            List<PassengerWithFlight> passengers = await GetPassengersByFlightCodeAsync(flight.FlightCode);
            Flight f = await FlightCollection.Find(fl => fl.FlightCode == flight.FlightCode).FirstOrDefaultAsync();
            if (passengers.Count == f.NumberPlaces) { return false; }
            PassengerWithFlight p = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1]).FirstOrDefaultAsync();
            if (p != null)
            {
                p.FlightsRegistration.Add(flight);
                await PassengerCollection.ReplaceOneAsync(pass => pass.Email == details[0] && pass.Password == details[1], p);
                return true;
            }
            return false;

        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    public async Task<bool> RemoveFlightAsync(params string[] details)
    {
        try
        {
            PassengerWithFlight p = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1]).FirstOrDefaultAsync();
            if (p != null)
            {
                FlightRegistration flightToRemove = p.FlightsRegistration.Find(f => f.FlightCode == details[2]);
                if (flightToRemove != null)
                {
                    p.FlightsRegistration.Remove(flightToRemove);
                    await PassengerCollection.ReplaceOneAsync(pass => pass.Email == details[0] && pass.Password == details[1], p);
                    return true;
                }
            }
            throw new ArgumentNullException("This flight dont exist");


        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    public async Task<bool> UpdateFlightAsync(FlightRegistration flight, params string[] details)
    {
        try
        {
            PassengerWithFlight p = await PassengerCollection.Find(pass => pass.Email == details[0] && pass.Password == details[1]).FirstOrDefaultAsync();
            if (p != null)
            {
                FlightRegistration theCorrectFlight = p.FlightsRegistration.Find(p => p.FlightCode == details[2]);
                if (theCorrectFlight != null)
                {
                    p.FlightsRegistration.Remove(theCorrectFlight);
                    p.FlightsRegistration.Add(flight);
                }
                await PassengerCollection.ReplaceOneAsync(pass => pass.Email == details[0] && pass.Password == details[1], p);
                return true;
            }
            return false;

        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }
    public async Task<List<PassengerWithFlight>> GetPassengersByFlightCodeAsync(string flightCode)
    {
        if (flightCode == null) throw new ArgumentNullException("Flight code is null");
        try
        {
            List<PassengerWithFlight> passengersList = new List<PassengerWithFlight>();
            List<PassengerWithFlight> passengers = await GetAllAsync();
            foreach (var pass in passengers)
            {
                if (pass.FlightsRegistration.Find(f => f.FlightCode == flightCode) != null)
                {
                    passengersList.Add(pass);
                }
            }
            return passengersList;
        }
        catch (ArgumentNullException ex) { throw ex; }
        catch (TimeoutException ex) { throw ex; }
        catch (Exception ex) { throw ex; }
    }

    #endregion

}
