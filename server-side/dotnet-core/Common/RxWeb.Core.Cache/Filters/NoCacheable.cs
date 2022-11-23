using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;

namespace RxWeb.Core.Cache
{
    public class NoCacheable : ActionFilterAttribute
    {
        public NoCacheable() { }


        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.HttpContext.Response.StatusCode == 200)
                context.HttpContext.Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue
                {
                    NoCache = true,
                    MustRevalidate = true,
                    Private = true
                };
        }
    }
}
