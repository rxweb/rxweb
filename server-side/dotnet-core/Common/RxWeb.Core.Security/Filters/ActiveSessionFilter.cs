using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;

namespace RxWeb.Core.Security.Filters
{
    public class ActiveSession : ActionFilterAttribute
    {
        private double SessionTimeOut { get; set; }
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            SetSession(context.HttpContext);
            base.OnActionExecuted(context);
        }

        private void SetSession(HttpContext context)
        {
            var expirationTime = context.User.Claims.SingleOrDefault(t => t.Type == ClaimTypes.Expiration);
            if (expirationTime != null)
            {
                SessionTimeOut = Convert.ToDouble(expirationTime.Value);
                DateTime epochStart = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, DateTime.UtcNow.Hour, DateTime.UtcNow.Minute, 0, 0, DateTimeKind.Utc).AddMinutes(Convert.ToDouble(SessionTimeOut));
                context.Response.Headers.Add("x-session", new[] { epochStart.ToString() });
            }
        }
    }
}
