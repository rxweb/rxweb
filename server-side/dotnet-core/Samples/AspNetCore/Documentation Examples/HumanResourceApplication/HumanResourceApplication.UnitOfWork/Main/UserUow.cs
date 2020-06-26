using RxWeb.Core.Data;
using HumanResourceApplication.BoundedContext.Main;

namespace HumanResourceApplication.UnitOfWork.Main
{
    public class UserUow : BaseUow, IUserUow
    {
        public UserUow(IUserContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
    }

    public interface IUserUow : ICoreUnitOfWork { }
}


