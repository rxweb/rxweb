using Microsoft.Extensions.DependencyInjection;
using ContosoApplication.Infrastructure.Singleton;
using ContosoApplication.BoundedContext.Singleton;
using RxWeb.Core.Data;

namespace ContosoApplication.Api.Bootstrap
{
    public static class Singleton
    {
        public static void AddSingletonService(this IServiceCollection serviceCollection)
        {
            #region Singleton
            serviceCollection.AddSingleton<ITenantDbConnectionInfo, TenantDbConnectionInfo>();
            serviceCollection.AddSingleton(typeof(UserAccessConfigInfo));
            #endregion Singleton
        }

    }
}




