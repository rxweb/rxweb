using RxWeb.Core.Data.Annotations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RxWeb.Core.Data
{
    public interface ICoreUnitOfWork
    {
        IDbContext Context { get; set; }

        Task RegisterNewAsync<T>([NotNull] T entity) where T : class;

        Task RegisterNewAsync<T>([NotNull] IEnumerable<T> entities) where T : class;

        Task RegisterDirtyAsync<T>([NotNull] T entity) where T : class;

        Task RegisterDirtyAsync<T>([NotNull] IEnumerable<T> entities) where T : class;

        Task RegisterCleanAsync<T>([NotNull] T entity) where T : class;

        Task RegisterCleanAsync<T>([NotNull] IEnumerable<T> entities) where T : class;

        Task RegisterDeletedAsync<T>([NotNull] T entity) where T : class;

        Task RegisterDeletedAsync<T>([NotNull] IEnumerable<T> entities) where T : class;

        Task<int> CommitAsync();

        void Refresh();

        IRepository<TEntity> Repository<TEntity>() where TEntity : class;

    }
}
