using RxWeb.Core.Data;
using HumanResourceApplication.BoundedContext.Main;

namespace HumanResourceApplication.UnitOfWork.Main
{
    public class CandidateLookupUow : BaseUow, ICandidateLookupUow
    {
        public CandidateLookupUow(ICandidateLookupContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
    }

    public interface ICandidateLookupUow : ICoreUnitOfWork { }
}


