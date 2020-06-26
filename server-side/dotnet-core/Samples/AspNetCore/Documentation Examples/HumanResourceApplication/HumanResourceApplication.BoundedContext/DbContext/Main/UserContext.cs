using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using HumanResourceApplication.BoundedContext.SqlContext;
using HumanResourceApplication.Models.Main;
using HumanResourceApplication.Models;
using HumanResourceApplication.BoundedContext.Singleton;
using RxWeb.Core.Data;
using RxWeb.Core.Data.Models;
using RxWeb.Core.Data.BoundedContext;

namespace HumanResourceApplication.BoundedContext.Main
{
  public class UserContext : BaseBoundedContext, IUserContext
  {
    public UserContext(MainSqlDbContext sqlDbContext, IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor, ITenantDbConnectionInfo tenantDbConnection) : base(sqlDbContext, databaseConfig.Value, contextAccessor, tenantDbConnection) { }

    #region DbSets
    public DbSet<vUser> vUsers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<vCountryLookup> vCountryLookup { get; set; }
    #endregion DbSets



  }


  public interface IUserContext : IDbContext
  {
  }
}

