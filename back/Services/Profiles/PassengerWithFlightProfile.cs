using AutoMapper;
namespace Services.Profiles;

internal class PassengerWithFlightProfile : Profile
{
    public PassengerWithFlightProfile()
    {
        /* CreateMap<PassengerWithFlight, PassengerWithFlightDTO>().
              ForMember(p => p.FlightsRegistration,
                              option =>
                              option.MapFrom(
                                  src => src.FlightsRegistration))
              .ReverseMap();*/

        CreateMap<PassengerWithFlight, PassengerWithFlightDTO>().
            ForMember(d => d.FlightsRegistration, otp => otp.MapFrom(src => src.FlightsRegistration)).
            ReverseMap();
        CreateMap<Flight, FlightDTO>().ReverseMap();
        CreateMap<FlightRegistration, FlightRegistrationDTO>().ReverseMap();

    }
}



