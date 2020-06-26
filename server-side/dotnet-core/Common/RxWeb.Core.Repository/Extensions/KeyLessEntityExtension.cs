using Microsoft.EntityFrameworkCore;
using RxWeb.Core.Data.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RxWeb.Core.Data
{
    public static class KeyLessEntityExtension
    {
        public static ModelBuilder AddHasNoKeys(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetCustomAttributes(typeof(KeyLessEntityAttribute), true).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
                modelBuilder.Entity(enumerator.Current).HasNoKey();
            return modelBuilder;
        }
    }
}
