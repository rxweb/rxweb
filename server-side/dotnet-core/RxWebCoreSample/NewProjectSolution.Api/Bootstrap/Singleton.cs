using Microsoft.Extensions.DependencyInjection;
using NewProjectSolution.Infrastructure.Singleton;
using NewProjectSolution.BoundedContext.Singleton;
using RxWeb.Core.Data;

namespace NewProjectSolution.Api.Bootstrap
{
    public static class Singleton
    {
        public static void AddSingletonService(this IServiceCollection serviceCollection) {
            #region Singleton
            serviceCollection.AddSingleton<ITenantDbConnectionInfo,TenantDbConnectionInfo>();
            serviceCollection.AddSingleton(typeof(UserAccessConfigInfo));
            #endregion Singleton
        }

    }
}




