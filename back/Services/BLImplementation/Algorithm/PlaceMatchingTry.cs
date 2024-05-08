
namespace Services.BLImplementation.Algorithm;

public class PlaceMatchingTry : IPlaceMatchingTry
{
    List<FlightDTO> flights;
    List<PassengerDTO> passengers;
    IPassengerService passengerService;
    IFlightService flightService;
    //string[] preferd1 = {"לדבר עם השכנים שלי ", "לסרוג", "לקרוא", "לישון", "לעבוד", "לצפות בסרטים"};
    Dictionary<string, int> preferd;
    double[,] rawData;

    public PlaceMatchingTry(IPassengerService passengerService, IFlightService flightService)
    {
        flights = new();
        passengers = new();
        preferd = new Dictionary<string, int>();
        preferd.Add("לדבר עם השכנים שלי ", 1);
        preferd.Add("לסרוג", 2);
        preferd.Add("לקרוא", 3);
        preferd.Add("לישון", 4);
        preferd.Add("לעבוד", 5);
        preferd.Add("לצפות בסרטים", 6);
        preferd.Add("", 7);
        this.passengerService = passengerService;
        this.flightService = flightService;
    }

    public async Task MatchingAsync()
    {
        flights = await flightService.GetAllAsync();
        foreach (FlightDTO flight in flights)
        {
            DateTime yesterday = new DateTime(flight.Date.Year, flight.Date.Month, flight.Date.Day - 1);
            passengers = await passengerService.GetPassengerByFlightCodeAsync(flight.FlightCode);

            if (DateTime.Today == yesterday || passengers.Count == flight.NumberPlaces)
            {
                rawData = new double[passengers.Count, 4];
                for (int i = 0; i < passengers.Count; i++)
                {
                    if (passengers[i].FavoriteSomeoneFirstName != null || passengers[i].FavoriteSomeoneFirstName != null)
                    {

                    }
                    /*rawData[i] = new double[] { preferd[passengers[i].Preferred], passengers[i].Details.Age };*/
                    rawData[i, 0] = preferd[passengers[i].Preferred];
                    rawData[i, 1] = DateTime.Today.Year - (passengers[i].Details.Birthday.Year);
                    //rawData[i, 2] = (double)passengers[i].Details.Gender;
                    rawData[i, 3] = (double)i;
                    // => [[preferred] [age] [gender: 0|1] []]



                }

                int numClusters = 3;
                //int[] clustering = KMeans.Cluster(rawData, numClusters); // this is it
            }
        }
    }

        //Console.WriteLine("\nBegin k-means++ demo ");

      

/*
        int k = 3;  // number clusters
        string initMethod = "plusplus";
        int maxIter = 100;  // max (likely less)
        int seed = 0;

        KMeans km = new KMeans(k, data, initMethod, maxIter, seed);

        int trials = 10;

        km.Cluster(trials);*/
        //int[] clustering = Cluster(rawData, numClusters); // this is it




    }

 
