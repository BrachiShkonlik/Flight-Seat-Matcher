

namespace Services.Interface;

internal interface IMLSharpPython
{
    string ExecutePythonScript(string filePythonScript, out string standardError);
}
