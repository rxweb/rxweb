using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Threading;
using System.Threading.Tasks;

namespace RxWeb.Core.Data
{
    public interface IDbContext
    {
        //string Name { get; }
        DatabaseFacade Database { get; }

        DbSet<TEntity> Set<TEntity>() where TEntity : class;

        EntityEntry<T> Entry<T>(T entity) where T : class;
        int SaveChanges();

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        ChangeTracker ChangeTracker { get; }
    }
}
