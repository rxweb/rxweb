using Microsoft.AspNetCore.Http;

namespace RxWeb.Core.Annotations
{
    public interface IModelValidation
    {
        object Validate(object value, HttpContext httpContext);
    }
}
