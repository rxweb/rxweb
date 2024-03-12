using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using RxWeb.Core.Data.Models;
using System.Data;

namespace RxWeb.Core.Data
{
    public class DbContextManager<DbContextEntity> : IDbContextManager<DbContextEntity>  where DbContextEntity : DbContext
    {
        private DbContext  Context { get; set; }

        private IDbContextTransaction DbContextTransaction { get; set; }
        private DatabaseConfig DatabaseConfig { get; set; }
        public DbContextManager(IServiceProvider serviceProvider, IOptions<DatabaseConfig> databaseConfig) {
            Context = (DbContext)serviceProvider.GetService(typeof(DbContextEntity));
            DatabaseConfig = databaseConfig.Value;
        }

        public async Task<IEnumerable<TEntity>> StoreProc<TEntity>(string name, SqlParameter[] sqlParameters) where TEntity : new()
        {
            var sqlConnection = new SqlConnection(Context.Database.GetDbConnection().ConnectionString);
            SqlCommand sqlCommand = new SqlCommand(name, sqlConnection);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            sqlCommand.CommandTimeout = DatabaseConfig.CommandTimeout;
            foreach (var param in sqlParameters) 
                sqlCommand.Parameters.Add(param);
            await sqlConnection.OpenAsync();
            var result = new List<TEntity>();
            var dataReader = await sqlCommand.ExecuteReaderAsync();
            while (dataReader.Read()) {
                var entity = new TEntity();
                var properties = entity.GetType().GetProperties();
                for (int i = 0; i < dataReader.FieldCount; i++)
                {
                    if (!dataReader.IsDBNull(i))
                    {
                        string fieldName = dataReader.GetName(i);
                        var propertyInfo = properties.SingleOrDefault(m => string.Equals(m.Name, fieldName, StringComparison.OrdinalIgnoreCase));
                        if (propertyInfo != null)
                            propertyInfo.SetValue(entity,dataReader.GetValue(i));
                    }
                }
                result.Add(entity);
            }
            dataReader.Close();
            sqlConnection.Close();
            sqlConnection.Dispose();
            return result;
        }
        public async Task<IDbContextTransaction> BeginTransactionAsync() {
            DbContextTransaction = await Context.Database.BeginTransactionAsync();
            return DbContextTransaction;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync(params ICoreUnitOfWork[] coreUnitOfWorks)
        {
            DbContextTransaction = await Context.Database.BeginTransactionAsync();
            foreach (var coreUnitOfWork in coreUnitOfWorks) {
                coreUnitOfWork.Context.Database.UseTransaction(DbContextTransaction.GetDbTransaction());
            }
            return DbContextTransaction;
        }

        public void RollbackTransaction() {
            Context.Database.RollbackTransaction();
            DbContextTransaction = null;
        }

        public Task CommitAsync() {
            if(DbContextTransaction != null)
                Context.Database.CommitTransaction();
            return Task.CompletedTask;
        }

        public async Task CommitAsync(params ICoreUnitOfWork[] coreUnitOfWorks) {
            using (var transaction = Context.Database.BeginTransaction()) {
                foreach (var coreUnitOfWork in coreUnitOfWorks) {
                    coreUnitOfWork.Context.Database.UseTransaction(transaction.GetDbTransaction());
                    await coreUnitOfWork.CommitAsync();
                }
                transaction.Commit();
            }
        }
    }
}
