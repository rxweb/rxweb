using RxWeb.Core.Data;
using NewProjectSolution.BoundedContext.Main;

namespace NewProjectSolution.UnitOfWork.Main
{
    public class LoginUow : BaseUow, ILoginUow
    {
        public LoginUow(ILoginContext context, IRepositoryProvider repositoryProvider,IAuditLog auditLog) : base(context, repositoryProvider,auditLog) { }
    }

    public interface ILoginUow : ICoreUnitOfWork { }
}


