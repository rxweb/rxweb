using System.ComponentModel.DataAnnotations;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class ApplicationExtensions
    {
        public static object GetKeyValue(object entity) {
            var primaryKey = entity.GetType().GetProperties().FirstOrDefault(p => p.GetCustomAttributes(typeof(KeyAttribute), false).Count() > 0);
            if (primaryKey != null) {
                return primaryKey.GetValue(entity);
            }
            return 0;
        }
    }
}
