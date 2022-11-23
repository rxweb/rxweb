using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using System;

namespace RxWeb.Core.Cache
{
    public class Cachable : ActionFilterAttribute
    {
        private double Milliseconds { get; set; }
        public Cachable(double milliseconds) {
            Milliseconds = milliseconds;
        }
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.HttpContext.Response.StatusCode == 200 && context.HttpContext.Request.Method == "GET") 
                    SetResponseCacheControl(context.HttpContext.Response);
        }

        private void SetResponseCacheControl(HttpResponse response)
        {
            response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue()
            {
                MaxAge = TimeSpan.FromMilliseconds(Milliseconds),
                Private = true
            };
        }
    }
}
