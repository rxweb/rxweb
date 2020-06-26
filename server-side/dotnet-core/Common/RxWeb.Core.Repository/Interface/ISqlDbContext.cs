using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Data.Common;

namespace RxWeb.Core.Data
{
    public interface ISqlDbContext
    {
        DatabaseFacade Database { get; }

        DbConnection DbConnection { get;}

        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
