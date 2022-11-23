using Microsoft.EntityFrameworkCore.Infrastructure;

namespace RxWeb.Core.Annotations
{
    public interface IDatabaseFacade
    {
        DatabaseFacade Database { get; }
    }
}
