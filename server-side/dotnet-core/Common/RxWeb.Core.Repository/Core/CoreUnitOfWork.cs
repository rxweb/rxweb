using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Data.Audit;
using RxWeb.Core.Data.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RxWeb.Core.Data
{
    public abstract class CoreUnitOfWork : ICoreUnitOfWork, IDisposable
    {
        public CoreUnitOfWork(IDbContext context, IRepositoryProvider repositoryProvider, IAuditLog auditLog = null) {
            InstanceType = context.GetType();
            Context = context;
            RepositoryProvider = repositoryProvider;
            if (auditLog != null)
                this.AuditLog = auditLog;
            EntityAudit = new EntityAudit(context.Database);
        }

        private EntityAudit EntityAudit { get; set; }
        public IDbContext Context { get; set; }

        public IRepositoryProvider RepositoryProvider { get; set; }

        private IAuditLog AuditLog { get; set; }

        private List<PropertyValues> AddedEntities { get; set; } = new List<PropertyValues>();

        private Type InstanceType { get; set; }
        public DatabaseFacade Database { get => this.Context.Database; }

        public Task RegisterNewAsync<T>([NotNull] T entity) where T : class
        {
            this.StateChange<T>(entity, EntityState.Added);
            EntityEntry dbEntityEntry = Context.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {

                var dbSet = Context.Set<T>();
                dbSet.Add(entity);
            }
            return Task.CompletedTask;
        }


        

        public async Task RegisterNewAsync<T>([NotNull] IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities)
                await RegisterNewAsync(entity);
        }

        public Task RegisterDirtyAsync<T>([NotNull] T entity) where T : class
        {
            this.StateChange<T>(entity, EntityState.Modified);
            var dbEntityEntry = Context.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                var dbSet = Context.Set<T>();
                dbSet.Attach(entity);
            }
            setEntryState(entity, EntityState.Modified);
            return Task.CompletedTask;
        }


        public async Task RegisterDirtyAsync<T>([NotNull] IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities)
                await RegisterDirtyAsync(entity);
        }

        public Task RegisterCleanAsync<T>([NotNull] T entity) where T : class
        {
            setEntryState(entity, EntityState.Unchanged);
            return Task.CompletedTask;
        }


        public async Task RegisterCleanAsync<T>([NotNull] IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities)
                await RegisterCleanAsync<T>(entity);
        }

        public Task RegisterDeletedAsync<T>([NotNull] T entity) where T : class
        {
            this.StateChange<T>(entity, EntityState.Deleted);
            var dbSet = Context.Set<T>();
            dbSet.Remove(entity);
            setEntryState(entity, EntityState.Deleted);
            return Task.CompletedTask;
        }



        public async Task RegisterDeletedAsync<T>([NotNull] IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities)
                await RegisterDeletedAsync(entity);
        }

        private void setEntryState<T>(T entity, EntityState state) where T : class
        {
            Context.Entry(entity).State = state;
        }

        public virtual async Task<int> CommitAsync()
        {
            try
            {
                this.ModifiedEntityAudit();
                var id = await Context.SaveChangesAsync();
                this.AdddedEntityAudit();
                if(this.EntityAudit.CoreAudits.Count>0)
                    this.AuditLog.Log(this.EntityAudit.CoreAudits);
                return id;
            }
            catch (DbUpdateConcurrencyException exception)
            {
                var stringBuilder = new StringBuilder();
                foreach (var entry in exception.Entries)
                {
                    if (entry is IConcurrencyException)
                        ((IConcurrencyException)entry).OnConcurrencyException(entry,this);
                    else
                        stringBuilder.AppendLine(entry.Metadata.Name);
                }
                if(stringBuilder.Length> 0)
                    throw new NotSupportedException(stringBuilder.ToString());
            }
            return 0;
        }


        private void ModifiedEntityAudit() {
            try {
                if (this.AuditLog != null)
                {
                    this.SetAudit();
                }
            }
            catch (Exception ex) {
                this.AuditLog.OnException(ex);
            }
            
        }

        private void AdddedEntityAudit() {
            if (this.AuditLog != null)
            {
                if (this.AddedEntities.Count() > 0)
                {
                    this.AddedEntities.ForEach(t =>
                    {
                        this.EntityAudit.Log(t, null, EntityState.Added);
                    });
                    
                }
            }
        }

        private void SetAudit() => Context.ChangeTracker.Entries().Where(t => t.State == EntityState.Modified || t.State == EntityState.Added || t.State == EntityState.Deleted).ToList().ForEach(entity =>
        {
            switch (entity.State)
            {
                case EntityState.Added:
                    if (this.AuditLog != null) this.AddedEntities.Add(entity.CurrentValues);
                    break;
            }
            if (entity.State != EntityState.Added) 
                this.LogAudit(entity);
        });


        private void LogAudit(EntityEntry entityEntry)
        {
            if (this.AuditLog != null)
            {
                var entityType = entityEntry.Entity.GetType();
                var recordLog = entityType.GetCustomAttributes(typeof(RecordLogAttribute), false).SingleOrDefault() as RecordLogAttribute;
                if (recordLog != null)
                {
                    entityEntry.OriginalValues.SetValues(entityEntry.GetDatabaseValuesAsync().Result);
                    this.EntityAudit.Log(entityEntry.CurrentValues, entityEntry.OriginalValues,entityEntry.State);
                }
            }
        }
        public void Refresh()
        {
            Context.ChangeTracker.Entries().ToList().ForEach(x =>
             {
                 x.State = EntityState.Detached;
             });
        }

        protected virtual void StateChange<TEntity>(TEntity entity, EntityState entityState) where TEntity : class
        {

        }

        public virtual IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            return RepositoryProvider.Repository<TEntity>(Context, InstanceType);
        }

        public void Dispose()
        {
            InstanceType = null;
            this.EntityAudit.CoreAudits.Clear();
            this.AddedEntities.Clear();
        }
    }
}
