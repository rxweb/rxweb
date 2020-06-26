using RxWeb.Core.Data;

namespace ContosoApplication.UnitOfWork
{
    public class BaseUow : CoreUnitOfWork
    {
        public BaseUow(IDbContext context, IRepositoryProvider repositoryProvider, IAuditLog auditLog = null) : base(context, repositoryProvider, auditLog) { }
    }
}


