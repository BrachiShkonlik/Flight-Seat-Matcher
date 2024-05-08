
namespace Services.Interface;

public interface IScriptRunner
{
    string RunPythonScript(string rCodeFilePath, string args);
}
