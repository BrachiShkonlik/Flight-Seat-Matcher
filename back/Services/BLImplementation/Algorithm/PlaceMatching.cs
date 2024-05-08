
namespace Services.BLImplementation.Algorithm;
public class PlaceMatching
{
    // Get config settings
    /*  private static string _filePythonExePath;
      //private static string _folderImagePath;
      private static string _filePythonNamePath;
      private static string _filePythonParameterName;*/

    /*private static string filepythonexepath = Properties.Settings.Default.FilePythonExePath;
    private static string folderImagePath = Properties.Settings.Default.FolderImagePath;
    private static string filePythonNamePath = Properties.Settings.Default.FilePythonNamePath;
    private static string filePythonParameterName = Properties.Settings.Default.FilePythonParameterName;*/
    /*  public PlaceMatching(string filePythonExePath, string folderImagePath, string filePythonNamePath, string filePythonParameterName)
      {
          _filePythonExePath = filePythonExePath;
         // _folderImagePath = folderImagePath;
          _filePythonParameterName = filePythonParameterName;
          _filePythonParameterName = filePythonParameterName;
      }
  */
    public static void RunPythonScript(string filePythonExePath, /*string folderImagePath,*/ string filePythonNamePath, string filePythonParameterName)
    {
        string outputText, standardError;

        // Instantiate Machine Learning C# - Python class object            
        IMLSharpPython mlSharpPython = new MLSharpPython(filePythonExePath);
        // Test image

        // string imagePathName = _folderImagePath + "Image_Test_Name.png";

        // Define Python script file and input parameter name

        /*  string fileNameParameter = $"{_filePythonNamePath} {_filePythonParameterName} {imagePathName}";*/
        string fileNameParameter = $"{filePythonNamePath} {filePythonParameterName} ";
        // Execute the python script file 
        outputText = mlSharpPython.ExecutePythonScript(fileNameParameter, out standardError);
        if (string.IsNullOrEmpty(standardError))
        {
            switch (outputText.ToLower())
            {
                case "1":
                    Console.WriteLine("Image category 1");
                    break;
                case "0":
                    Console.WriteLine("Image category 0");
                    break;
                default:
                    Console.WriteLine(outputText);
                    break;
            }
        }
        else
        {
            Console.WriteLine(standardError);
        }
        Console.ReadKey();
    }
}
