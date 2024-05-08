
/*using static Services.BLImplementation.Algorithm.ScriptRunner;*/

namespace Services.BLImplementation.Algorithm;

public class ScriptRunner : IScriptRunner
{
    public string RunPythonScript(string rCodeFilePath, string args)
    {
        string file = rCodeFilePath;
        string result = string.Empty;

        try
        {

            var info = new ProcessStartInfo(@"C:\Users\xyz\AppData\Local\Programs\Python\Python37\python.exe");
            info.Arguments = rCodeFilePath + " " + args;

            info.RedirectStandardInput = false;
            info.RedirectStandardOutput = true;
            info.UseShellExecute = false;
            info.CreateNoWindow = true;

            using (var proc = new Process())
            {
                proc.StartInfo = info;
                proc.Start();
                proc.WaitForExit();
                if (proc.ExitCode == 0)
                {
                    result = proc.StandardOutput.ReadToEnd();
                }
            }
            return result;
        }
        catch (Exception ex)
        {
            throw new Exception("R Script failed: " + result, ex);
        }
    }
  /*  public static void Main()
    {
        string args = "1 2";
        string res = ScriptRunner.RunPythonScript(@"your file path", args);

    }*/



    public class MLSharpPython : IMLSharpPython
    {
        public readonly string filePythonExePath;
        /// <summary>
        /// ML Sharp Python class constructor
        /// </summary>
        /// <param name="exePythonPath">Python EXE file path</param>
        public MLSharpPython(string exePythonPath)
        {
            filePythonExePath = exePythonPath;
        }
        /// <summary>
        /// Execute Python script file
        /// </summary>
        /// <param name="filePythonScript">Python script file and input parameter(s)</param>
        /// <param name="standardError">Output standard error</param>
        /// <returns>Output text result</returns>
        public string ExecutePythonScript(string filePythonScript, out string standardError)
        {
            string outputText = string.Empty;
            standardError = string.Empty;
            try
            {
                using (Process process = new Process())
                {
                    process.StartInfo = new ProcessStartInfo(filePythonExePath)
                    {
                        Arguments = filePythonScript,
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        CreateNoWindow = true
                    };
                    process.Start();
                    outputText = process.StandardOutput.ReadToEnd();
                    outputText = outputText.Replace(Environment.NewLine, string.Empty);
                    standardError = process.StandardError.ReadToEnd();
                    process.WaitForExit();
                }
            }
            catch (Exception ex)
            {
                string exceptionMessage = ex.Message;
            }
            return outputText;
        }
    }
}


