using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace RxWeb.Core.Data
{
    public static class Utilities
    {
        public static Expression<Func<TEntity, bool>> BuildLambdaForFindByKey<TEntity>(int id)
        {
            var primaryKey = typeof(TEntity).GetProperties().FirstOrDefault(p => p.GetCustomAttributes(typeof(KeyAttribute), false).Count() > 0);
            if (primaryKey != null)
            {
                var item = Expression.Parameter(typeof(TEntity), "entity");
                var primaryKeyEqual = Expression.Equal(Expression.Property(item, primaryKey.Name), Expression.Constant(id));
                var lambda = Expression.Lambda<Func<TEntity, bool>>(primaryKeyEqual, item);
                return lambda;
            }
            return null;
        }

        public static Expression<Func<TEntity, bool>> BuildLambdaForFindBySharedKey<TEntity>(Dictionary<string, object> queryParams)
        {
            var item = Expression.Parameter(typeof(TEntity), "entity");
            if (queryParams.Keys.Count == 1)
                return Expression.Lambda<Func<TEntity, bool>>(Expression.Equal(Expression.Property(item, queryParams.First().Key), Expression.Constant(queryParams.First().Value)), item);
            else
            {
                var leftExpression = Expression.Lambda<Func<TEntity, bool>>(Expression.Equal(Expression.Property(item, queryParams.First().Key), Expression.Constant(queryParams.First().Value)), item);
                var rightExpression = Expression.Lambda<Func<TEntity, bool>>(Expression.Equal(Expression.Property(item, queryParams.Last().Key), Expression.Constant(queryParams.Last().Value)), item);
                var andLambda = Expression.AndAlso(leftExpression.Body, rightExpression.Body);
                return Expression.Lambda<Func<TEntity, bool>>(andLambda, item);
            }
        }
    }
}
