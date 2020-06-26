using System.Collections.Generic;

namespace RxWeb.Core.Data.Models
{
    public class SchemaBased
    {
        public bool ConfigFromDb { get; set; }
        public Dictionary<string, Dictionary<string, string>> HostUriSchemaMappings { get; set; } = new Dictionary<string, Dictionary<string, string>>();
    }
}
