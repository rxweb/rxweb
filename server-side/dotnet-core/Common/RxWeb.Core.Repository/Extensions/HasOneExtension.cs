using Microsoft.EntityFrameworkCore;
using RxWeb.Core.Data.Annotations;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Data
{
    public static class HasOneExtension
    {
        public static ModelBuilder AddHasOne(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetProperties().Where(x => x.GetCustomAttributes(typeof(HasOneAttribute), true).Count() > 0).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var properties = enumerator.Current.GetProperties().Where(x => x.GetCustomAttributes(typeof(HasOneAttribute), true).Count() > 0);
                foreach (var property in properties)
                {
                    var hasOne = property.GetCustomAttributes(typeof(HasOneAttribute), true).SingleOrDefault() as HasOneAttribute;
                    var modelReferenceBuilder = !string.IsNullOrEmpty(hasOne.WithMany) ? modelBuilder.Entity(enumerator.Current).HasOne(property.Name).WithMany(hasOne.WithMany) : modelBuilder.Entity(enumerator.Current).HasOne(property.Name).WithMany();
                    if(hasOne.ForeignKeys.Length > 0)
                        modelReferenceBuilder.HasForeignKey(hasOne.ForeignKeys);
                    if(hasOne.PrincipalKeys != null && hasOne.PrincipalKeys.Length > 0)
                        modelReferenceBuilder.HasPrincipalKey(hasOne.ForeignKeys);
                }
            }
            return modelBuilder;
        }
    }
}
