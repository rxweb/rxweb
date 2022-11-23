using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Concurrent;

namespace RxWeb.Core.Security.Filters
{
    public class AllowRequest : ActionFilterAttribute
    {
        public int MaxRequestCountPerIp { get; set; }
        private static ConcurrentDictionary<string, int> Requests { get; set; } = new ConcurrentDictionary<string, int>();
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var clientIp = context.HttpContext.Connection.RemoteIpAddress.ToString();
            if (context.HttpContext.Request.Cookies.TryGetValue("anonymous", out var anonymous))
                context.Result = new StatusCodeResult(304);
            else if (Requests.TryGetValue(clientIp, out var requestCount))
                if (MaxRequestCountPerIp < requestCount)
                    context.Result = new StatusCodeResult(401);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.HttpContext.Response.StatusCode == 200) {
                var clientIp = context.HttpContext.Connection.RemoteIpAddress.ToString();
                if (Requests.TryGetValue(clientIp, out var requestCount))
                    Requests.AddOrUpdate(clientIp, requestCount++, (x, y) => requestCount++);
                else
                    Requests.AddOrUpdate(clientIp, 1, (x, y) => requestCount);
            }
            base.OnActionExecuted(context);
        }
    }
}
