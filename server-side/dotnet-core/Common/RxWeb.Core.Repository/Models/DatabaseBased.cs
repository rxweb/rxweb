namespace RxWeb.Core.Data.Models
{
    public class DatabaseBased
    {
        public Dictionary<string, Dictionary<string, string>> HostUriConnectionMappings { get; set; } = new Dictionary<string, Dictionary<string, string>>();
        public bool ConfigFromDb { get; set; }
    }
}
