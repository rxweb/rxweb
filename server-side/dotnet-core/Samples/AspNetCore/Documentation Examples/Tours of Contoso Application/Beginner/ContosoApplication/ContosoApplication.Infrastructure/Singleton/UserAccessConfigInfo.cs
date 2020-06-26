
using ContosoApplication.Models.Main;
using ContosoApplication.UnitOfWork.Main;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ContosoApplication.Infrastructure.Singleton
{
    public class UserAccessConfigInfo
    {
        public UserAccessConfigInfo()
        {
            this.AccessInfo = new ConcurrentDictionary<int, Dictionary<int, Dictionary<string, bool>>>();
            this.Tokens = new ConcurrentDictionary<string, string>();
        }
        private ConcurrentDictionary<int, Dictionary<int, Dictionary<string, bool>>> AccessInfo { get; set; }

        public ConcurrentDictionary<string, string> Tokens { get; set; }

        public async Task<Dictionary<int, Dictionary<string, bool>>> GetFullInfoAsync(int userId, ILoginUow loginUow)
        {
            Dictionary<int, Dictionary<string, bool>> modules = null;
            if (!this.AccessInfo.TryGetValue(userId, out modules))
            {
                await this.CacheAccessInfoAsync(loginUow, userId);
                this.AccessInfo.TryGetValue(userId, out modules);
            }
            return modules;
        }

        public async Task<bool> GetAccessInfoAsync(int userId, int applicationModuleId, string action, ILoginUow loginUow, bool cachedCall = false)
        {
            Dictionary<int, Dictionary<string, bool>> moduleIds;
            if (this.AccessInfo.TryGetValue(userId, out moduleIds))
            {
                Dictionary<string, bool> actionAccess;
                if (moduleIds.TryGetValue(applicationModuleId, out actionAccess))
                {
                    bool value;
                    if (actionAccess.TryGetValue(action, out value))
                        return value;
                }
            }
            else
            {
                if (!cachedCall)
                {
                    await this.CacheAccessInfoAsync(loginUow, userId);
                    return await this.GetAccessInfoAsync(userId, applicationModuleId, action, loginUow);
                }
            }
            return false;
        }

        public void SaveAccessInfo(int userId, Dictionary<int, Dictionary<string, bool>> value)
        {
            this.AccessInfo.AddOrUpdate(userId, value, (x, y) => value);
        }

        private async Task CacheAccessInfoAsync(ILoginUow loginUow, int userId)
        {
            var userRoles = loginUow.Repository<UserRole>().FindBy(t => t.UserId == userId);
            var rolePermissions = new List<RolePermission>();
            foreach (var userRole in userRoles)
            {
                var permissions = await loginUow.Repository<RolePermission>().FindByAsync(t => t.RoleId == userRole.RoleId);
                rolePermissions.AddRange(permissions);
            }
            var userAccess = rolePermissions.OrderBy(t => t.PermissionPriority);
            var moduleAccess = new Dictionary<int, Dictionary<string, bool>>();
            foreach (var access in userAccess)
            {
                var actionAccess = new Dictionary<string, bool>();
                actionAccess.Add(GET, access.CanView == true);
                actionAccess.Add(POST, access.CanAdd == true);
                actionAccess.Add(PUT, access.CanEdit == true);
                actionAccess.Add(PATCH, access.CanEdit == true);
                actionAccess.Add(DELETE, access.CanDelete == true);
                moduleAccess.Add(access.ApplicationModuleId, actionAccess);
            }
            this.SaveAccessInfo(userId, moduleAccess);
        }

        public async Task<string> GetTokenAsync(string securityKey, ILoginUow loginUow)
        {
            string token;
            if (!this.Tokens.TryGetValue(securityKey, out token))
            {
                var applicationUserToken = await loginUow.Repository<ApplicationUserToken>().SingleOrDefaultAsync(t => t.SecurityKey == securityKey);
                if (applicationUserToken != null)
                    this.Tokens.AddOrUpdate(applicationUserToken.SecurityKey, applicationUserToken.JwtToken, (x, y) => applicationUserToken.JwtToken);
                return applicationUserToken == null ? string.Empty : applicationUserToken.JwtToken;
            }
            return token;
        }

        public async Task SaveTokenAsync(int userId, string audience, KeyValuePair<string, string> token, ILoginUow loginUow)
        {
            var applicationUserToken = new ApplicationUserToken
            {
                AudienceType = audience,
                CreatedDateTime = DateTime.UtcNow,
                UserId = userId,
                JwtToken = token.Value,
                SecurityKey = token.Key
            };
            await loginUow.RegisterNewAsync<ApplicationUserToken>(applicationUserToken);
            await loginUow.CommitAsync();
            this.Tokens.AddOrUpdate(token.Key, token.Value, (x, y) => token.Value);
        }

        public async Task RemoveTokenAsync(int userId, string audience, ILoginUow loginUow)
        {
            var applicationUserTokens = await loginUow.Repository<ApplicationUserToken>().FindByAsync(t => t.UserId == userId && t.AudienceType == audience);
            foreach (var applicationUserToken in applicationUserTokens)
            {
                await loginUow.RegisterDeletedAsync<ApplicationUserToken>(applicationUserToken);
                string token;
                this.Tokens.TryRemove(applicationUserToken.SecurityKey, out token);
            }
            await loginUow.CommitAsync();

        }

        const string GET = "get";

        const string POST = "post";

        const string PUT = "put";

        const string PATCH = "patch";

        const string DELETE = "delete";
    }
}

