using ContosoApplication.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RxWeb.Core.Data.Models;

namespace ContosoApplication.Api.Bootstrap
{
    public static class ConfigurationOptions
    {
        public static void AddConfigurationOptions(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            #region ConfigurationOptions
            serviceCollection.Configure<DatabaseConfig>(configuration.GetSection("Database"));
            serviceCollection.Configure<SecurityConfig>(configuration.GetSection("Security"));
            #endregion ConfigurationOptions
        }
    }
}



