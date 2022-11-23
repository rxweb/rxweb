using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RxWeb.Core.Data
{
    public interface ITenantDbConnectionInfo
    {
        Task<Dictionary<string, string>> GetAsync(string hostUri);

        void Save(string hostUri, Dictionary<string, string> value);
    }
}
