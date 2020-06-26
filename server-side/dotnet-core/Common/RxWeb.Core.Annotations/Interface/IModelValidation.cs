using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Models;

namespace RxWeb.Core.Annotations
{
    public interface IModelValidation
    {
        ValidationResultModel Validate(object value, HttpContext httpContext);
    }
}
