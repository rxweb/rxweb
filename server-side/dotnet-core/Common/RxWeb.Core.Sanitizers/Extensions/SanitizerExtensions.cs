using Microsoft.AspNetCore.Http;
using RxWeb.Core.Sanitizers.Interface;
using System.Reflection;

namespace RxWeb.Core.Sanitizers.Extensions
{
    public static class SanitizerExtensions
    {
        public static object Sanitize(this object entity, HttpContext context, object rootEntity = null)
        {
            try
            {
                var entityType = entity.GetType();
                var properties = entityType.GetProperties();
                foreach (var property in properties)
                {
                    if (IsNotObject(property))
                    {
                        var attributes = property.GetCustomAttributes(true);
                        foreach (var attribute in attributes)
                        {
                            if (attribute is ISanitize)
                            {
                                var value = ((ISanitize)attribute).Sanitize(property.GetValue(entity), entity, rootEntity);
                                property.SetValue(entity, value);
                            }
                            else if (attribute is IActionSanitizer)
                            {
                                var value = ((IActionSanitizer)attribute).Sanitize(property.GetValue(entity), context);
                                property.SetValue(entity, value);
                            }
                        }
                    }
                    else if (property.PropertyType.BaseType == typeof(Object))
                    {
                        var value = (dynamic)property.GetValue(entity);
                        SanitizerExtensions.Sanitize(value, context, entity);
                    }
                    else if (property.PropertyType.IsGenericType)
                    {
                        var values = (dynamic)property.GetValue(entity);
                        if (values != null)
                            foreach (var item in values)
                                SanitizerExtensions.Sanitize(item, context, entity);
                    }
                }

                if (entity is ISanitizer)
                {
                    ((ISanitizer)entity).Sanitize();
                }
            }
            catch (Exception ex) { 
            
            }
            
            return entity;
        }

        private static bool IsNotObject(PropertyInfo property)
        {
            var result = property.PropertyType.BaseType == typeof(ValueType);
            if(!result)
            switch (property.PropertyType.Name)
            {
                case "String":
                case "DateTime":
                    result = true;
                    break;
            }
            return result;
        }
    }
}
