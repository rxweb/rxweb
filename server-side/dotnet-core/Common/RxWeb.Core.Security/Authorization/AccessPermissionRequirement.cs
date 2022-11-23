using Microsoft.AspNetCore.Authorization;
using System;

namespace RxWeb.Core.Security.Authorization
{
    public class AccessPermissionRequirement : IAuthorizationRequirement
    {
        public int ApplicationModuleId { get; private set; }

        public string ActionType { get; set; }

        public Type HaveAccess { get; set; }

        public AccessPermissionRequirement(int applicationModuleId,string actionType = null,Type haveAccess = null) { 
            ApplicationModuleId = applicationModuleId;
            ActionType = actionType;
            HaveAccess = haveAccess;
        }
    }
}
