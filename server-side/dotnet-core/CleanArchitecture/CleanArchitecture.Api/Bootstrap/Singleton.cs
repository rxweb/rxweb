using Microsoft.Extensions.DependencyInjection;
using PrimePro_Sample.BoundedContext.Singleton;
using PrimePro_Sample.Infrastructure.Singleton;
using RxWeb.Core.Data;

namespace PrimePro_Sample.Api.Bootstrap
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




