using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace RxWeb.Core.Data.Interface
{
    public interface IConcurrencyException
    {
        void OnConcurrencyException(EntityEntry entity,ICoreUnitOfWork uow);
    }
}
