using PrimePro_Sample.BoundedContext.DbContext.Main;
using RxWeb.Core.Data;

namespace PrimePro_Sample.UnitOfWork.Main
{
    public class LoginUow : BaseUow, ILoginUow
    {
        public LoginUow(ILoginContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
    }

    public interface ILoginUow : ICoreUnitOfWork { }
}


