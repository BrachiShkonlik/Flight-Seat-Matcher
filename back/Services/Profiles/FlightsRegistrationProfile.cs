
namespace Services.Profiles;

internal class FlightsRegistrationProfile : Profile
{
    public FlightsRegistrationProfile()
    {
        CreateMap<FlightRegistration, FlightRegistrationDTO>().
            ForMember(f => f.Flight,
                        option =>
                        option.MapFrom(src => src.Flight)).
                        ReverseMap();
    }
}
