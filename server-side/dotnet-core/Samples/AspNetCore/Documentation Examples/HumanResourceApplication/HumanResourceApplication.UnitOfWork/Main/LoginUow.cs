using RxWeb.Core.Data;
using HumanResourceApplication.BoundedContext.Main;

namespace HumanResourceApplication.UnitOfWork.Main
{
  public class LoginUow : BaseUow, ILoginUow
  {
    public LoginUow(ILoginContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
  }

  public interface ILoginUow : ICoreUnitOfWork { }
}


