using $ext_safeprojectname$.Infrastructure.Singleton;
using $ext_safeprojectname$.UnitOfWork.Main;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using RxWeb.Core.Security;
using RxWeb.Core.Security.Authorization;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace $ext_safeprojectname$.Infrastructure.Security
{
    public class AccessPermissionHandler : IAccessPermissionHandler
    {
        private UserAccessConfigInfo UserAccessConfig { get; set; }
        private IHttpContextAccessor ContextAccessor { get; set; }
        public AccessPermissionHandler(UserAccessConfigInfo userAccessConfig, IHttpContextAccessor contextAccessor)
        {
            UserAccessConfig = userAccessConfig;
            ContextAccessor = contextAccessor;
        }
        public async Task<bool> HandleRequirementAsync(AuthorizationHandlerContext context, AccessPermissionRequirement requirement)
        {
            var loginUow = ContextAccessor.HttpContext.RequestServices.GetService(typeof(ILoginUow)) as ILoginUow;
            var requestMethod = string.IsNullOrEmpty(requirement.ActionType) ?  ContextAccessor.HttpContext.Request.Method.ToLower() : requirement.ActionType;
            var haveAccess = await UserAccessConfig.GetAccessInfoAsync(GetUserId(context.User), requirement.ApplicationModuleId, requestMethod, loginUow);
            return haveAccess;
        }

        private int GetUserId(ClaimsPrincipal user)
        {
            var userId = 0;
            if (user.Claims != null)
            {
                var claim = user.Claims.SingleOrDefault(t => t.Type == ClaimTypes.NameIdentifier);
                if (claim != null)
                    userId = Convert.ToInt32(claim.Value);
            }
            return userId;
        }
    }
}


