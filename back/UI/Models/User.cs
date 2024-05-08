namespace UI.Models;

public class User
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string? FlightCode { get; set; }

    public User(string password, string email, string flightCode)
    {
        Email = email;
        Password = password;
        FlightCode = flightCode;
    }

    public User(string password, string email)
    {
        Email = email;
        Password = password;
    }
    public User()
    {
    }
}

