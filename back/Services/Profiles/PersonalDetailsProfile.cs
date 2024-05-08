
namespace Services.Profiles;

internal class PersonalDetailsProfile : Profile
{
	public PersonalDetailsProfile()
	{
		CreateMap<PersonalDetails, PersonalDetailsDTO>().ReverseMap();
	}
}
