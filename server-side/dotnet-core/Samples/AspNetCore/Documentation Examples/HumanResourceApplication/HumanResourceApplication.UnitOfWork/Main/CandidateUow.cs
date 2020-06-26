using RxWeb.Core.Data;
using HumanResourceApplication.BoundedContext.Main;

namespace HumanResourceApplication.UnitOfWork.Main
{
    public class CandidateUow : BaseUow, ICandidateUow
    {
        public CandidateUow(ICandidateContext context, IRepositoryProvider repositoryProvider) : base(context, repositoryProvider) { }
    }

    public interface ICandidateUow : ICoreUnitOfWork { }
}


