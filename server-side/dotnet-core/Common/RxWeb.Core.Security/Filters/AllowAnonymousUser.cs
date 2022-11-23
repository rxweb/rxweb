using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace RxWeb.Core.Security.Filters
{
    public class AllowAnonymousUser : ActionFilterAttribute, IAllowAnonymous
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var tokenAuthorizer = context.HttpContext.RequestServices.GetService(typeof(ITokenAuthorizer)) as ITokenAuthorizer;
            var result = tokenAuthorizer.AnonymousUserValidateToken(context.HttpContext);
            if (result == null)
                context.Result = new StatusCodeResult(401);
        }
    }
}
