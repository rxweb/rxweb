using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace RxWeb.Core.Data
{
    public class Repository<TEntity> :IRepository<TEntity> where  TEntity : class
    {
        internal IDbContext _context;
        internal DbSet<TEntity> _dbSet;

        public Repository(IDbContext context)
        {
            _context = context;
            var type = typeof(TEntity);
            _dbSet = context.Set<TEntity>();
            
        }

        public IEnumerable<TEntity> All()
        {
            return _dbSet.AsNoTracking().ToList();
        }

        public async Task<IEnumerable<TEntity>> AllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }


        public IQueryable<TEntity> Queryable()
        {
            return _dbSet.AsNoTracking();
        }

        public IEnumerable<TEntity> AllInclude
        (params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return GetAllIncluding(includeProperties).ToList();
        }

        public async Task<IEnumerable<TEntity>> AllIncludeAsync(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return await GetAllIncluding(includeProperties).ToListAsync();
        }

        public IEnumerable<TEntity> FindByInclude
          (Expression<Func<TEntity, bool>> predicate,
          params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = GetAllIncluding(includeProperties);
            IEnumerable<TEntity> results = query.Where(predicate).ToList();
            return results;
        }

        public async Task<IEnumerable<TEntity>> FindByIncludeAsync
          (Expression<Func<TEntity, bool>> predicate,
          params Expression<Func<TEntity, object>>[] includeProperties)
        {
            var query = GetAllIncluding(includeProperties);
            return await query.Where(predicate).ToListAsync();
        }

        private IQueryable<TEntity> GetAllIncluding
        (params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> queryable = _dbSet.AsNoTracking();

            return includeProperties.Aggregate
              (queryable, (current, includeProperty) => current.Include(includeProperty));
        }
        public IEnumerable<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate)
        {

            IEnumerable<TEntity> results = _dbSet.AsNoTracking()
              .Where(predicate).ToList();
            return results;
        }

        public async Task<IEnumerable<TEntity>> FindByAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking()
              .Where(predicate).ToListAsync();
        }

        public TEntity FindByKey(int id)
        {
            Expression<Func<TEntity, bool>> lambda = Utilities.BuildLambdaForFindByKey<TEntity>(id);
            return _dbSet.AsNoTracking().SingleOrDefault(lambda);
        }

        public async Task<TEntity> FindByKeyAsync(int id)
        {
            Expression<Func<TEntity, bool>> lambda = Utilities.BuildLambdaForFindByKey<TEntity>(id);
            return await _dbSet.AsNoTracking().SingleOrDefaultAsync(lambda);
        }

        public IEnumerable<TEntity> FindBySharedKey(Dictionary<string, object> queryParams)
        {
            Expression<Func<TEntity, bool>> lambda = Utilities.BuildLambdaForFindBySharedKey<TEntity>(queryParams);
            return this.FindBy(lambda);
        }

        public async Task<IEnumerable<TEntity>> FindBySharedKeyAsync(Dictionary<string, object> queryParams)
        {
            Expression<Func<TEntity, bool>> lambda = Utilities.BuildLambdaForFindBySharedKey<TEntity>(queryParams);
            return await this.FindByAsync(lambda);
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> predicate) {
            return _dbSet.AsNoTracking().SingleOrDefault(predicate);
        }

        public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().SingleOrDefaultAsync(predicate);
        }

        public TEntity Single(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.AsNoTracking().Single(predicate);
        }

        public async Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().SingleAsync(predicate);
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.AsNoTracking().FirstOrDefault(predicate);
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(predicate);
        }

        public TEntity First(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.AsNoTracking().First(predicate);
        }

        public async Task<TEntity> FirstAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().FirstAsync(predicate);
        }

        public TEntity LastOrDefault(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.AsNoTracking().LastOrDefault(predicate);
        }

        public async Task<TEntity> LastOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().LastOrDefaultAsync(predicate);
        }

        public TEntity Last(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.AsNoTracking().Last(predicate);
        }

        public async Task<TEntity> LastAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.AsNoTracking().LastAsync(predicate);
        }

        public int Count(Expression<Func<TEntity, bool>> predicate) {
            return _dbSet.AsNoTracking().Count(predicate);
        }
    }
}
