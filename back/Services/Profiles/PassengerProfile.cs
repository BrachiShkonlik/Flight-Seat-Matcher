namespace AppServices.Profiles;
internal class PassengerProfile : Profile
{
    public PassengerProfile()
    {
        CreateMap<Passenger, PassengerDTO>().ReverseMap();
        CreateMap<Flight, FlightDTO>().ReverseMap();
        CreateMap<PersonalDetails, PersonalDetailsDTO>().ReverseMap();
    }
}
