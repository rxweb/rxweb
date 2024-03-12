using RxWeb.Core.Sanitizers.Interface;

namespace RxWeb.Core.Sanitizers
{
    public class ToLower : Attribute, ISanitize
    {
        public object Sanitize(object value, object entity,object rootEntity)
        {
            return !String.IsNullOrEmpty(value as string) ? (value as string).ToLower() : value;
        }
    }
}
