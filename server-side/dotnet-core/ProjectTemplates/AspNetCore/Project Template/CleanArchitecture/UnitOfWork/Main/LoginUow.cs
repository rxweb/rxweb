using RxWeb.Core.Data;
using $ext_safeprojectname$.BoundedContext.Main;

namespace $ext_safeprojectname$.UnitOfWork.Main
{
    public class LoginUow : BaseUow, ILoginUow
    {
        public LoginUow(ILoginContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
    }

    public interface ILoginUow : ICoreUnitOfWork { }
}


