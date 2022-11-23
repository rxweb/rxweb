using System;

namespace RxWeb.Core.Data
{
    public interface IRepositoryProvider : IDisposable
    {
        IRepository<TEntity> Repository<TEntity>(IDbContext context, Type instance) where TEntity : class;

        dynamic GetRepositoryByType(Type entityType, Type instanceType);
    }
}
