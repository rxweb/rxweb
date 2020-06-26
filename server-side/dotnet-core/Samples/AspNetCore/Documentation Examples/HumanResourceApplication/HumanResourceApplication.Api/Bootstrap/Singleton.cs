using Microsoft.Extensions.DependencyInjection;
using HumanResourceApplication.Infrastructure.Singleton;
using HumanResourceApplication.BoundedContext.Singleton;
using RxWeb.Core.Data;

namespace HumanResourceApplication.Api.Bootstrap
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




