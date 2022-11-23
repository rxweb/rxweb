using Microsoft.Extensions.DependencyInjection;
using CleanArchitecture.Infrastructure.Singleton;
using CleanArchitecture.BoundedContext.Singleton;
using RxWeb.Core.Data;

namespace CleanArchitecture.Api.Bootstrap
{
    public static class Singleton
    {
        public static void AddSingletonService(this IServiceCollection serviceCollection) {
            #region Singleton
            serviceCollection.AddSingleton<ITenantDbConnectionInfo, TenantDbConnectionInfo>();
            serviceCollection.AddSingleton(typeof(UserAccessConfigInfo));
            #endregion Singleton
        }

    }
}




