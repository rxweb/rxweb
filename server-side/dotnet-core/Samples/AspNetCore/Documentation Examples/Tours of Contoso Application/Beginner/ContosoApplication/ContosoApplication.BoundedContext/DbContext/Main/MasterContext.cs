using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ContosoApplication.BoundedContext.SqlContext;
using ContosoApplication.Models.Main;
using ContosoApplication.Models;
using ContosoApplication.BoundedContext.Singleton;
using RxWeb.Core.Data;
using RxWeb.Core.Data.Models;
using RxWeb.Core.Data.BoundedContext;

namespace ContosoApplication.BoundedContext.Main
{
    public class MasterContext : BaseBoundedContext, IMasterContext
    {
        public MasterContext(MainSqlDbContext sqlDbContext, IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor, ITenantDbConnectionInfo tenantDbConnection) : base(sqlDbContext, databaseConfig.Value, contextAccessor, tenantDbConnection) { }

        #region DbSets
        public DbSet<vStudentRecord> vStudentRecords { get; set; }
        public DbSet<vStudent> vStudents { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Cours> Courses { get; set; }
        #endregion DbSets


    }


    public interface IMasterContext : IDbContext
    {
    }
}

