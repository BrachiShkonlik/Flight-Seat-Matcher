
namespace UI.Controllers;


[ApiController]
public class ErrorsController : ControllerBase
{
    ILogger<ErrorsController> _logger;
    public ErrorsController(ILogger<ErrorsController> logger)
    {
        _logger = logger;
    }

    [Route("/error")]
    [ApiExplorerSettings(IgnoreApi = true)]

    public ActionResult Error([FromServices] IHostEnvironment hostEnvironment)
    {
        var exceptionHandlerFeature =
            HttpContext.Features.Get<IExceptionHandlerFeature>();
        _logger.LogError(exceptionHandlerFeature?.Error.ToString());

        return Problem(
            detail: "Please try later...",
            title: "Sorry...");

    }

    [Route("/error-development")]
    [ApiExplorerSettings(IgnoreApi = true)]

    public ActionResult DevelopmentError([FromServices] IHostEnvironment hostEnvironment)
    {
        var exceptionHandlerFeature =
            HttpContext.Features.Get<IExceptionHandlerFeature>();
        _logger.LogError(exceptionHandlerFeature?.Error.ToString());

        return Problem(
            detail: exceptionHandlerFeature?.Error.StackTrace,
            title: exceptionHandlerFeature?.Error.Message);

    }
}
