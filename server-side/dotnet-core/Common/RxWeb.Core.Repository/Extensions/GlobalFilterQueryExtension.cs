using Microsoft.EntityFrameworkCore;
using RxWeb.Core.Data.Annotations;
using System.Linq.Expressions;
using System.Reflection;

namespace RxWeb.Core.Data
{
    public static class GlobalFilterQueryExtension
    {
        private static LambdaExpression GetTenantFilterExpression<T>(Type type, PropertyInfo propertyInfo, T value)
        {
            var propertyMethod = typeof(EF).GetMethod(nameof(EF.Property), BindingFlags.Static | BindingFlags.Public).MakeGenericMethod(propertyInfo.PropertyType);
            var parameter = Expression.Parameter(type, "t");
            var expressionCall = Expression.Call(propertyMethod, parameter, Expression.Constant(propertyInfo.Name));
            var condition = Expression.Equal(expressionCall, Expression.Constant(value));
            var lambda = Expression.Lambda(condition, parameter);
            return lambda;
        }
        public static ModelBuilder AddTenantFilter<T>(this ModelBuilder modelBuilder, T value)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetProperties().Where(x => x.GetCustomAttributes(typeof(TenantQueryFilterAttribute), true).Count() > 0).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var properties = enumerator.Current.GetProperties().Where(x => x.GetCustomAttributes(typeof(TenantQueryFilterAttribute), true).Count() > 0);
                foreach (var property in properties)
                    modelBuilder.Entity(enumerator.Current).HasQueryFilter(GetTenantFilterExpression<T>(enumerator.Current, property, value));
            }
            return modelBuilder;
        }

        public static ModelBuilder GlobalQueryFilter(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetCustomAttributes(typeof(GlobalQueryFilterAttribute), true).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var globalQueryFilter = enumerator.Current.GetCustomAttributes(typeof(GlobalQueryFilterAttribute), true).Single() as GlobalQueryFilterAttribute;
                modelBuilder.Entity(enumerator.Current).HasQueryFilter(
                    globalQueryFilter.GetFilterExpression(enumerator.Current)
                    );
            }
            return modelBuilder;
        }


    }
}
