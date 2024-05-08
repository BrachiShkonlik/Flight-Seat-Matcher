
namespace Services;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection collection)
    {
        collection.AddSingleton<IPassengerService, PassengerService>();
        collection.AddSingleton<IPassengerWithFlightService, PassengerWithFlightService>();
        collection.AddSingleton<IFlightService, FlightService>();
        collection.AddSingleton<IPersonalDetailsService, PersonalDetailsService>();
        //collection.AddSingleton<IPlaceMatching, PlaceMatching>();
        //collection.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        collection.AddAutoMapper(typeof(PassengerProfile), typeof(FlightProfile),
            typeof(PersonalDetailsProfile), typeof(PassengerWithFlightProfile));

        //collection.AddRepositories(config);
        collection.AddRepositories();
        return collection;
    }
}


