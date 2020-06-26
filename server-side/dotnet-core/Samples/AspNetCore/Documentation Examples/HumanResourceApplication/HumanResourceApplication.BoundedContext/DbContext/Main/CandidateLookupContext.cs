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
    public class CandidateLookupContext : BaseBoundedContext, ICandidateLookupContext
    {
        public CandidateLookupContext(MainSqlDbContext sqlDbContext,  IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor,ITenantDbConnectionInfo tenantDbConnection): base(sqlDbContext, databaseConfig.Value, contextAccessor,tenantDbConnection){ }

            #region DbSets
            		public DbSet<Country> Countries { get; set; }
            		public DbSet<Country> vCountries { get; set; }
            #endregion DbSets



    }


    public interface ICandidateLookupContext : IDbContext
    {
    }
}

