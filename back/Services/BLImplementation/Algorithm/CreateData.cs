
namespace Services.BLImplementation.Algorithm;

public class CreateData
{
    IPassengerWithFlightService _passengerService;
    IFlightService _flightService;
    List<PassengerWithFlightDTO> passengers;
    List<FlightDTO> flights;
    Dictionary<string, int> preferd;
    double[,] rawData;
    readonly string filePythonExePath;
    readonly string filePythonNamePath;

    public CreateData(IPassengerWithFlightService passengerService, IFlightService flightService)
    {
        flights = new();
        passengers = new();
        _passengerService = passengerService;
        _flightService = flightService;
        preferd = new Dictionary<string, int>();
        preferd.Add("לדבר עם השכנים שלי ", 1);
        preferd.Add("לסרוג", 2);
        preferd.Add("לקרוא", 3);
        preferd.Add("לישון", 4);
        preferd.Add("לעבוד", 5);
        preferd.Add("לצפות בסרטים", 6);
        preferd.Add("", 7);
    }
    public CreateData()
    {
        flights = new();
        passengers = new();
    }
    public async Task CreateFlightListAsync()
    {
        flights = await _flightService.GetAllAsync();
        foreach (FlightDTO flight in flights)
        {
            DateTime yesterday = new DateTime(flight.Date.Year, flight.Date.Month, flight.Date.Day - 1);
            passengers = await _passengerService.GetPassengersByFlightCodeAsync(flight.FlightCode);
            if (DateTime.Today == yesterday)
            {
                rawData = new double[passengers.Count, 4];
                for (int i = 0; i < passengers.Count; i++)
                {
                    foreach (var pass in passengers)
                    {
                        FlightRegistrationDTO flg = pass.FlightsRegistration.Find(f => f.FlightCode == flight.FlightCode);
                        if (flg != null)
                        {
                            if (flg.FavoriteSomeoneFirstName != null || flg.FavoriteSomeoneFirstName != null)
                            {
                                List<PassengerWithFlightDTO> favoritePassengers = new List<PassengerWithFlightDTO>();
                                FindFavoriteSomeone(flight.FlightCode, passengers, favoritePassengers, flg.FavoriteSomeoneFirstName, flg.FavoriteSomeoneFirstName);
                                // TODO: how to add to final result???
                            }

                            // TODO: normal the data
                            rawData[i, 0] = (double)i;
                            if (flg.Preferred == null) { rawData[i, 1] = 7; }
                            else { rawData[i, 1] = preferd[flg.Preferred]; }
                            rawData[i, 2] = (double)(DateTime.Today.Year - (passengers[i].Birthday.Year)) / 100;
                            rawData[i, 3] = (double)passengers[i].Gender;
                            // => [[i] [preferred] [age] [gender: 2|1|0 ]]
                        }
                    }
                }
                // TODO: write the data to file.... 
                WriteDataToFile(rawData, flight.FlightCode);
            }
        }
    }
    public void WriteDataToFile(double[,] data, string flightCode)
    {
        string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath, $"{flightCode}.txt")))
        {
            foreach (var d in data)
            {
                outputFile.WriteLine($"{d} ");
            }
        }
        Any(Path.Combine(docPath, $"{flightCode}.txt"));
    }
    public void Any(string filePythonParameterName)
    {
        PlaceMatching.RunPythonScript(filePythonExePath, filePythonNamePath, filePythonParameterName);
    }
    public void FindFavoriteSomeone(string flightCode, List<PassengerWithFlightDTO> passengers, List<PassengerWithFlightDTO> favoritePassengers, string firstName, string lastName)
    {
        PassengerWithFlightDTO pass = passengers.Find(p => p.FirstName == firstName && p.LastName == lastName);
        if (pass != null)
        {
            favoritePassengers.Add(pass);
            foreach (var f in pass.FlightsRegistration)
            {
                if (f.FlightCode == flightCode && f.FavoriteSomeoneFirstName != null && f.FavoriteSomeoneLastName != null)
                {
                    FindFavoriteSomeone(flightCode, passengers, favoritePassengers, f.FavoriteSomeoneFirstName, f.FavoriteSomeoneLastName);
                }
                return;
            }
        }


    }

}