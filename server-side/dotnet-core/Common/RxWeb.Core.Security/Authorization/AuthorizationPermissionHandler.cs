using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace RxWeb.Core.Security.Authorization
{
    public class AuthorizationPermissionHandler : AuthorizationHandler<AccessPermissionRequirement>
    {
        public AuthorizationPermissionHandler(IHttpContextAccessor contextAccessor)
        {
            ContextAccessor = contextAccessor;
        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AccessPermissionRequirement requirement)
        {
            var accessPermissionHandler = requirement.HaveAccess != null ? ContextAccessor.HttpContext.RequestServices.GetService(requirement.HaveAccess) as IAccessPermissionHandler : ContextAccessor.HttpContext.RequestServices.GetService(typeof(IAccessPermissionHandler)) as IAccessPermissionHandler;
            var haveAccess = await accessPermissionHandler.HandleRequirementAsync(context,requirement);
            if (haveAccess)
                context.Succeed(requirement);
            else
                context.Fail();
        }

        private IHttpContextAccessor ContextAccessor { get; set; }
    }
}
