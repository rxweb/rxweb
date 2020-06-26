using Microsoft.Extensions.DependencyInjection;
using HumanResourceApplication.BoundedContext.SqlContext;

namespace HumanResourceApplication.Api.Bootstrap
{
  public static class AddDbContextExtension
  {
    public static void AddDbContextService(this IServiceCollection serviceCollection)
    {
      #region SqlDbContext
      serviceCollection.AddDbContext<MainSqlDbContext>();
      serviceCollection.AddScoped<IMainDatabaseFacade, MainSqlDbContext>();
      serviceCollection.AddDbContext<LogSqlDbContext>();
      serviceCollection.AddScoped<ILogDatabaseFacade, LogSqlDbContext>();
      #endregion SqlDbContext



    }
  }
}



