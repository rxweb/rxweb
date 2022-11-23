using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using RxWeb.Core.Security.Singleton;
using System;
using System.Threading.Tasks;

namespace RxWeb.Core.Security.Authorization
{
    public class AccessPolicyProvider : IAuthorizationPolicyProvider
    {
        const string POLICY_PREFIX = "ROLE_";
        public DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }

        public AccessPolicyProvider(IOptions<AuthorizationOptions> options)
        {
            FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);
        }

        public Task<AuthorizationPolicy> GetDefaultPolicyAsync() => FallbackPolicyProvider.GetDefaultPolicyAsync();

        public Task<AuthorizationPolicy> GetPolicyAsync(string policyName)
        {
            AccessAtributeInfo accessAtributeInfo = new AccessAtributeInfo();
            PolicyProviderAdditionalValue.Values.TryGetValue(policyName, out accessAtributeInfo);
            if (policyName.StartsWith(POLICY_PREFIX, StringComparison.OrdinalIgnoreCase) &&
                int.TryParse(policyName.Substring(POLICY_PREFIX.Length), out var applicationModuleId))
            {
                var policy = new AuthorizationPolicyBuilder();
                policy.AddRequirements(new AccessPermissionRequirement(applicationModuleId,accessAtributeInfo.ActionType,accessAtributeInfo.HaveAccess));
                return Task.FromResult(policy.Build());
            }

            return FallbackPolicyProvider.GetPolicyAsync(policyName);
        }

        public Task<AuthorizationPolicy> GetFallbackPolicyAsync()
        {
            return FallbackPolicyProvider.GetFallbackPolicyAsync();
        }
    }
}
