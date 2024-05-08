namespace AppServices.Profiles;
internal class FlightProfile : Profile
{
    public FlightProfile()
    {
        CreateMap<Flight, FlightDTO>().ReverseMap();
    }
}

