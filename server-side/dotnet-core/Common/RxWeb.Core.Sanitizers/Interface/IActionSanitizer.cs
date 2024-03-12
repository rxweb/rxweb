using Microsoft.AspNetCore.Http;

namespace RxWeb.Core.Sanitizers.Interface
{
    public interface IActionSanitizer
    {
        Object Sanitize(object value, HttpContext context);
    }
}
