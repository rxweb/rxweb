using Microsoft.Extensions.DependencyInjection;
using $ext_safeprojectname$.Infrastructure.Singleton;
using $ext_safeprojectname$.BoundedContext.Singleton;
using RxWeb.Core.Data;

namespace $ext_safeprojectname$.Api.Bootstrap
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




