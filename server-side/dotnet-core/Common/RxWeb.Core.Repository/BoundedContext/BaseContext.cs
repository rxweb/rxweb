using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RxWeb.Core.Data.Models;

namespace RxWeb.Core.Data.BoundedContext
{
    public abstract class BaseDbContext : DbContext
    {
        public BaseDbContext(IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor, ITenantDbConnectionInfo tenantDbConnection)
        {
            ConnectionStringConfig = databaseConfig.Value.ConnectionString;
            DatabaseConfig = databaseConfig.Value;
            TenantDbConnection = tenantDbConnection;
            ContextAccessor = contextAccessor;
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

		public string Name{ get; set; }

        public string GetConnection(string keyName)
        {
			this.Name = keyName;
            return GetDbConnectionString(keyName);
        }

        private string GetDbConnectionString(string keyName)
        {
            var connectionString = string.Empty;
            if (ConnectionStringConfig.ContainsKey(keyName) && !string.IsNullOrEmpty(ConnectionStringConfig[keyName]))
            {
                connectionString = ConnectionStringConfig[keyName];
            }
            else
            {
                var hostUri = GetHostUri();
                if (DatabaseConfig.MultiTenant != null && DatabaseConfig.MultiTenant.Database != null && (DatabaseConfig.MultiTenant.Database.ConfigFromDb || DatabaseConfig.MultiTenant.Database.HostUriConnectionMappings.Count > 0)) {
                    var clientConfig = new Dictionary<string, string>();
                    if (DatabaseConfig.MultiTenant.Database.HostUriConnectionMappings.Count > 0 && DatabaseConfig.MultiTenant.Database.HostUriConnectionMappings.ContainsKey(hostUri)) 
                        clientConfig = DatabaseConfig.MultiTenant.Database.HostUriConnectionMappings[hostUri];
                    else
                        clientConfig = TenantDbConnection.GetAsync(hostUri).Result;
                    if (clientConfig != null && clientConfig.ContainsKey(keyName))
                        connectionString = clientConfig[keyName];
                }
                
            }
            return connectionString;
        }

        private string GetHostUri()
        {
            return ContextAccessor.HttpContext.Request.Host.Value;
        }


        private Dictionary<string, string> ConnectionStringConfig { get; set; }

        private IHttpContextAccessor ContextAccessor { get; set; }

        private ITenantDbConnectionInfo TenantDbConnection { get; set; }

        private DatabaseConfig DatabaseConfig { get; set; }

    }
}
