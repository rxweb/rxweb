using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using CleanArchitecture.BoundedContext.SqlContext;
using CleanArchitecture.Models.Main;
using CleanArchitecture.Models;
using CleanArchitecture.BoundedContext.Singleton;
using RxWeb.Core.Data;
using RxWeb.Core.Data.Models;
using RxWeb.Core.Data.BoundedContext;

namespace CleanArchitecture.BoundedContext.Main
{
    public class MasterContext : BaseBoundedContext, IMasterContext
    {
        public MasterContext(MainSqlDbContext sqlDbContext,  IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor,ITenantDbConnectionInfo tenantDbConnection): base(sqlDbContext, databaseConfig.Value, contextAccessor,tenantDbConnection){ }

            #region DbSets
            		public DbSet<Department> Departments { get; set; }
		public DbSet<Employee> Employees { get; set; }
            #endregion DbSets


    }


    public interface IMasterContext : IDbContext
    {
    }
}

