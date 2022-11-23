using Microsoft.EntityFrameworkCore;
using RxWeb.Core.Data.Annotations;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Data
{
    public static class CompositeKeyExtension
    {
        public static ModelBuilder AddCompositeKeys(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetProperties().Where(x => x.GetCustomAttributes(typeof(CompositeKeyAttribute), true).Count() > 0).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var properties = enumerator.Current.GetProperties().Where(x => x.GetCustomAttributes(typeof(CompositeKeyAttribute), true).Count() > 0);
                var compositeKeys = new HashSet<string>();
                foreach (var property in properties)
                {
                    compositeKeys.Add(property.Name);
                }
                modelBuilder.Entity(enumerator.Current).HasKey(compositeKeys.ToArray());
            }
            return modelBuilder;
        }
    }
}
