using Microsoft.AspNetCore.Http;
using PrimePro_Sample.Infrastructure.Singleton;
using PrimePro_Sample.Models.Main;
using PrimePro_Sample.Models.ViewModels;
using PrimePro_Sample.UnitOfWork.Main;
using RxWeb.Core.Security;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PrimePro_Sample.Infrastructure.Security
{
    public class ApplicationTokenProvider : IApplicationTokenProvider
    {
        private ILoginUow LoginUow { get; set; }
        private UserAccessConfigInfo UserAccessConfig { get; set; }
        private IJwtTokenProvider TokenProvider { get; set; }

        private IUserClaim UserClaim { get; set; }

        private IHttpContextAccessor ContextAccessor { get; set; }

        public ApplicationTokenProvider(IJwtTokenProvider tokenProvider, UserAccessConfigInfo userAccessConfig, ILoginUow loginUow, IUserClaim userClaim, IHttpContextAccessor contextAccessor)
        {
            TokenProvider = tokenProvider;
            UserAccessConfig = userAccessConfig;
            LoginUow = loginUow;
            UserClaim = userClaim;
            ContextAccessor = contextAccessor;
        }
        public async Task<string> GetTokenAsync(vUser user)
        {
            var expirationTime = user.UserId == 0 ? DateTime.UtcNow.AddDays(1) : DateTime.UtcNow.AddMinutes(30);
            var token = TokenProvider.WriteToken(new[]{
                new Claim(
                    ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Anonymous, (user.UserId == 0).ToString()),
                    new Claim(ClaimTypes.Locality,user.LanguageCode),
                    new Claim(CustomClaimTypes.TimeZone,user.ApplicationTimeZoneName)
                    }, "Web", "User", expirationTime);
            if (user.UserId != 0) await UserAccessConfig.SaveTokenAsync(user.UserId, "web", token, LoginUow);
            //this.AddCookie(user, token.Key);
            return token.Value;
        }

        public async Task<string> RefereshTokenAsync(vUser user, UserConfig userConfig)
        {
            if (!string.IsNullOrEmpty(userConfig.LanguageCode))
            {
                var userRecord = await LoginUow.Repository<User>().SingleAsync(t => t.UserId == user.UserId);
                userRecord.LanguageCode = userConfig.LanguageCode;
                await LoginUow.RegisterDirtyAsync<User>(userRecord);
                await LoginUow.CommitAsync();
            }
            await UserAccessConfig.RemoveTokenAsync(user.UserId, userConfig.AudienceType, LoginUow);
            return await this.GetTokenAsync(user);
        }

        public async Task RemoveTokenAsync(UserConfig userConfig)
        {
            this.RemoveCookie();
            await UserAccessConfig.RemoveTokenAsync(UserClaim.UserId, userConfig.AudienceType, LoginUow);
        }


        private void AddCookie(vUser user, string value)
        {
            var cookieName = user.UserId == 0 ? ANONYMOUS : REQUEST_IDENTITY;
            if (cookieName == REQUEST_IDENTITY && ContextAccessor.HttpContext.Request.Cookies.ContainsKey(ANONYMOUS))
                ContextAccessor.HttpContext.Response.Cookies.Delete(ANONYMOUS);
            ContextAccessor.HttpContext.Response.Cookies.Append(cookieName, value);
        }
        private void RemoveCookie() => ContextAccessor.HttpContext.Response.Cookies.Delete(REQUEST_IDENTITY);

        private const string REQUEST_IDENTITY = "request_identity";
        private const string ANONYMOUS = "anonymous";
    }

    public interface IApplicationTokenProvider
    {
        Task<string> GetTokenAsync(vUser user);

        Task<string> RefereshTokenAsync(vUser user, UserConfig userConfig);

        Task RemoveTokenAsync(UserConfig userConfig);
    }
}



