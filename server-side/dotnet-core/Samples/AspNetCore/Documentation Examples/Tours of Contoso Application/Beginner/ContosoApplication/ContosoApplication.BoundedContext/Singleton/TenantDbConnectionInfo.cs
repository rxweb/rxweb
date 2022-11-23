using System.Collections.Concurrent;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using System.Threading.Tasks;
using ContosoApplication.Models;
using RxWeb.Core.Data;
using RxWeb.Core.Data.Models;

namespace ContosoApplication.BoundedContext.Singleton
{
    public class TenantDbConnectionInfo : ITenantDbConnectionInfo
    {

        public TenantDbConnectionInfo(IOptions<DatabaseConfig> databaseConfig)
        {
            this.ConnectionInfo = new ConcurrentDictionary<string, Dictionary<string, string>>();
            this.DatabaseConfig = databaseConfig.Value;
        }
        private ConcurrentDictionary<string, Dictionary<string, string>> ConnectionInfo { get; set; }

        public async Task<Dictionary<string, string>> GetAsync(string hostUri)
        {
            var connectionInfo = this.GetConnectionString(hostUri);
            if (connectionInfo == null)
            {
                return await this.SetUpDataAndGetConnectionInfo(hostUri);
            }
            return null;
        }

        private Dictionary<string, string> GetConnectionString(string hostUri)
        {
            Dictionary<string, string> cacheValue;
            if (this.ConnectionInfo.TryGetValue(hostUri, out cacheValue))
            {
                return cacheValue;
            }
            return null;
        }


        private async Task<Dictionary<string, string>> SetUpDataAndGetConnectionInfo(string uri)
        {
            var sqlConnection = new SqlConnection(DatabaseConfig.ConnectionString["##ConnectionName##"]);
            try
            {
                sqlConnection.Open();
                var sqlCommand = new SqlCommand("select ##0##, ##1##,##2##, ##3## from ##4##", sqlConnection);
                var dataReader = sqlCommand.ExecuteReader();
                var hostUri = string.Empty;
                var connectionInfo = new Dictionary<string, string>();
                while (dataReader.Read())
                {
                    var currentHostUri = dataReader.GetString(0);
                    if (hostUri != string.Empty && hostUri != currentHostUri)
                    {
                        this.Save(hostUri, connectionInfo);
                        connectionInfo = new Dictionary<string, string>();
                    }
                    connectionInfo.Add(dataReader.GetString(1), dataReader.GetString(2));
                    hostUri = currentHostUri;
                }
                this.Save(hostUri, connectionInfo);
                dataReader.Close();
                await dataReader.DisposeAsync();
                await sqlConnection.CloseAsync();
            }
            finally
            {
                await sqlConnection.DisposeAsync();
            }
            return this.GetConnectionString(uri);
        }

        public void Save(string hostUri, Dictionary<string, string> value)
        {
            this.ConnectionInfo.AddOrUpdate(hostUri, value, (x, y) => value);
        }

        private DatabaseConfig DatabaseConfig { get; set; }
    }
}

