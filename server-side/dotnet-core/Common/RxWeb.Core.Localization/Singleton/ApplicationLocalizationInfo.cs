using Newtonsoft.Json;

namespace RxWeb.Core.Localization.Singleton
{
    internal static class ApplicationLocalizationInfo
    {
        internal static bool IsStaticMessages = false;
        internal static string WebRootPath = string.Empty;
        internal static Dictionary<string, Dictionary<string, string>> LocalizeKeys { get; set; } = new Dictionary<string, Dictionary<string, string>>();
        
        internal static void Set(string path,string currentLocale) {
            if (!LocalizeKeys.ContainsKey(currentLocale)) {
                var localizationFolder = $"{path}\\localization";
                if (Directory.Exists(localizationFolder))
                {
                    var validationFolderDirectoryInfo = new DirectoryInfo($"{localizationFolder}");
                    var filePath = $"{localizationFolder}\\global-{currentLocale}.json";
                    if (File.Exists(filePath)) {
                        var content = File.ReadAllText(filePath);
                        LocalizeKeys[currentLocale] = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);

                    }
                    
                }
            }
        }
    }
}
