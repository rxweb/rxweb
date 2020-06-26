using Microsoft.AspNetCore.Authorization;
using RxWeb.Core.Security.Authorization;
using System.Threading.Tasks;

namespace RxWeb.Core.Security
{
    public interface IAccessPermissionHandler
    {
        Task<bool> HandleRequirementAsync(AuthorizationHandlerContext context, AccessPermissionRequirement requirement);
    }
}
