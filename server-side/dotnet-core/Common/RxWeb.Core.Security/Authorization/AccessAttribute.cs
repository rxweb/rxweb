using Microsoft.AspNetCore.Authorization;
using RxWeb.Core.Security.Singleton;

namespace RxWeb.Core.Security.Authorization
{
    public class AccessAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "ROLE_";
        public AccessAttribute(int applicationModuleId, string actionType = null,Type haveAccess = null) {
            this.AccessAttributeInfo = new AccessAtributeInfo {
                ActionType = actionType,
                HaveAccess = haveAccess
            };
            
            ApplicationModuleId = applicationModuleId; 
        
        }

        public int ApplicationModuleId
        {
            get
            {
                if (int.TryParse(Policy.Substring(POLICY_PREFIX.Length), out var applicationModuleId))
                {
                    return applicationModuleId;
                }
                return default(int);
            }
            set
            {
                Policy = $"{POLICY_PREFIX}{value.ToString()}";
                PolicyProviderAdditionalValue.Values.AddOrUpdate(Policy, this.AccessAttributeInfo,(x,y)=>this.AccessAttributeInfo);
            }
        }

        private AccessAtributeInfo AccessAttributeInfo { get; set; }
    }
}
