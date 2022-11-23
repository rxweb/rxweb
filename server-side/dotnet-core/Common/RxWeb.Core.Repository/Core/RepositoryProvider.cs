using System;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Data
{
    public class RepositoryProvider : IRepositoryProvider
    {
        public RepositoryProvider()
        {
            Repositories = new Dictionary<Type, List<InstanceRepository>>();
        }

        public IRepository<TEntity> Repository<TEntity>(IDbContext context, Type instance) where TEntity : class
        {
            return this.GetRepository<TEntity>(context, instance);
        }

        private IRepository<TEntity> GetRepository<TEntity>(IDbContext context, Type instance) where TEntity : class
        {
            List<InstanceRepository> repositoryInstances;
            Repositories.TryGetValue(instance, out repositoryInstances);
            if (repositoryInstances != null)
            {
                var entityType = typeof(TEntity);
                var repositoryInstance = repositoryInstances.SingleOrDefault(t => t.Entity == entityType);
                if (repositoryInstance != null)
                {
                    return (IRepository<TEntity>)repositoryInstance.Repository;
                }
            }
            return MakeRepository<TEntity>(context, instance);
        }

        private IRepository<TEntity> MakeRepository<TEntity>(IDbContext context, Type instance) where TEntity : class
        {
            IRepository<TEntity> repository = new Repository<TEntity>(context);
            var repositoryInstance = new InstanceRepository
            {
                Entity = typeof(TEntity),
                Repository = repository
            };
            SetRepositoryInstance<TEntity>(repository, instance);
            return repository;
        }

        public dynamic GetRepositoryByType(Type entityType,Type instanceType) {
            List<InstanceRepository> repositoryInstances;
            Repositories.TryGetValue(instanceType, out repositoryInstances);
            if (repositoryInstances != null)
            {
                var repositoryInstance = repositoryInstances.SingleOrDefault(t => t.Entity == entityType);
                if (repositoryInstance != null)
                {
                    return repositoryInstance.Repository;
                }
            }
            return null;
        }


        private void SetRepositoryInstance<TEntity>(IRepository<TEntity> repository, Type instance) where TEntity : class
        {
            List<InstanceRepository> repositoryInstances;
            Repositories.TryGetValue(instance, out repositoryInstances);
            if (repositoryInstances == null)
                repositoryInstances = new List<InstanceRepository>();

            repositoryInstances.Add(new InstanceRepository
            {
                Entity = typeof(TEntity),
                Repository = repository
            });
            Repositories[instance] = repositoryInstances;
        }

        public void Dispose()
        {
            Repositories.Clear();
            Repositories = null;
        }

        private Dictionary<Type, List<InstanceRepository>> Repositories { get; set; }
    }
}
