namespace UI.Models;

public class PostData
{
    public FlightRegistrationDTO FlightRegistration { get; set; }
    public User User { get; set; }

    public PostData(FlightRegistrationDTO flight, User user)
    {
        FlightRegistration = flight;
        User = user;
    }
    public PostData()
    {  
        
    }
}
