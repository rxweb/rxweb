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
  public class CandidateContext : BaseBoundedContext, ICandidateContext
  {
    public CandidateContext(MainSqlDbContext sqlDbContext, IOptions<DatabaseConfig> databaseConfig, IHttpContextAccessor contextAccessor, ITenantDbConnectionInfo tenantDbConnection) : base(sqlDbContext, databaseConfig.Value, contextAccessor, tenantDbConnection) { }

    #region DbSets
    public DbSet<vCandidate> vCandidates { get; set; }
    public DbSet<vCandidateRecord> vCandidateRecords { get; set; }
    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<CandidateAvailability> CandidateAvailabilities { get; set; }
    #endregion DbSets


  }


  public interface ICandidateContext : IDbContext
  {
  }
}

