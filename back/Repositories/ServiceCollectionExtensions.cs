
namespace Repositories;
public static class ServiceCollectionExtensions
{
    public static void AddRepositories(this IServiceCollection collection)
    {
        collection.AddSingleton<IDataContext, DataContext>();
        collection.AddSingleton<IPersonalDetailsRepository, PersonalDetailsRepository>();
        collection.AddSingleton<IPassengerRepository, PassengerRepository>();
        collection.AddSingleton<IFlightRepository, FlightRepository>();
        collection.AddSingleton<IPassengerWithFlightRepository, PassengerWithFlightRepository>();

    }
}
