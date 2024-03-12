using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Data.Interface;
using System.Collections.Concurrent;

namespace RxWeb.Core.Data
{
    public static class ValueConversionExtension
    {
        private static ConcurrentDictionary<string, Dictionary<string, ValueConverter>> Conversions { get; set; } = new ConcurrentDictionary<string, Dictionary<string, ValueConverter>>();
        public static ModelBuilder AddPropertyValueConversion(this ModelBuilder modelBuilder)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetProperties().Where(x => x.GetCustomAttributes(typeof(ValueConversionAttribute), true).Count() > 0).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                Dictionary<string, ValueConverter> converterProps;
                if (!Conversions.TryGetValue(enumerator.Current.FullName, out converterProps))
                {
                    converterProps = new Dictionary<string, ValueConverter>();
                    var properties = enumerator.Current.GetProperties().Where(x => x.GetCustomAttributes(typeof(ValueConversionAttribute), true).Count() > 0);
                    foreach (var property in properties)
                    {
                        var valueConversionAttribute = property.GetCustomAttributes(typeof(ValueConversionAttribute), true).Single() as ValueConversionAttribute;
                        var converter = GetConverter(valueConversionAttribute.ConversionType);
                        if (converter != null)
                        {
                            modelBuilder.Entity(enumerator.Current).Property(property.Name).HasConversion(converter);
                        }

                    }
                }
                else
                {
                    foreach (var converterProp in converterProps)
                        modelBuilder.Entity(enumerator.Current).Property(converterProp.Key).HasConversion(converterProp.Value);
                }
            }
            return modelBuilder;
        }

        public static ModelBuilder AddTimeZoneValueConversion(this ModelBuilder modelBuilder, string timeZoneName)
        {
            var entityTypes = modelBuilder.Model.GetEntityTypes().Select(t => t.ClrType).ToList();
            var entities = entityTypes.Where(t => t.GetProperties().Where(x => x.GetCustomAttributes(typeof(TimeZoneValueConversionAttribute), true).Count() > 0).Count() > 0);
            var enumerator = entities.GetEnumerator();
            while (enumerator.MoveNext())
            {
                var properties = enumerator.Current.GetProperties().Where(x => x.GetCustomAttributes(typeof(TimeZoneValueConversionAttribute), true).Count() > 0);
                foreach (var property in properties)
                {
                    var timeZoneConversion = property.GetCustomAttributes(typeof(TimeZoneValueConversionAttribute), true).Single() as ITimeZoneConverter;
                    var converter = timeZoneConversion.GetConverter(timeZoneName);
                    modelBuilder.Entity(enumerator.Current).Property(property.Name).HasConversion(converter);
                }
            }
            return modelBuilder;
        }

        private static ValueConverter GetConverter(Type type)
        {
            return (ValueConverter)Activator.CreateInstance(type);
        }
    }
}
