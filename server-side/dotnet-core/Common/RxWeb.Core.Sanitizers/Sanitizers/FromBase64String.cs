using RxWeb.Core.Sanitizers.Interface;
using System;

namespace RxWeb.Core.Sanitizers
{
    public class FromBase64String : Attribute, ISanitize
    {
        public object Sanitize(object value, object entity, object rootEntity)
        {
            if (!string.IsNullOrEmpty(value as string))
            {
                var byteData = System.Convert.FromBase64String(value as string);
                return System.Text.ASCIIEncoding.ASCII.GetString(byteData);
            }
            return value;
        }
    }
}
