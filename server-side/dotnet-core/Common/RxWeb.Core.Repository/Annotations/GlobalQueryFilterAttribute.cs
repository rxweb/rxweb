using System.Linq.Expressions;
using System.Reflection;

namespace RxWeb.Core.Data.Annotations
{
    public class GlobalQueryFilterAttribute : Attribute
    {
        private string MethodName { get; set; }
        public GlobalQueryFilterAttribute(string name) {
            MethodName = name;
        }

        public LambdaExpression GetFilterExpression(Type type)
        {
            object instance = Activator.CreateInstance(type);
            return GetMethodResult(instance);
        }

        protected LambdaExpression GetMethodResult(object entity)
        {
            if (!string.IsNullOrEmpty(this.MethodName))
            {
                var methodInfo = GetMethodInfo(entity, this.MethodName);
                if (methodInfo != null)
                {
                    var result = (LambdaExpression)methodInfo.Invoke(entity, new object[] { });
                    return result;
                }
            }
            return default;
        }

        private MethodInfo GetMethodInfo(object entity, string methodName)
        {
            return ((System.Reflection.TypeInfo)entity.GetType()).DeclaredMethods.Where(t => t.Name == methodName).SingleOrDefault();
        }

    }
}
