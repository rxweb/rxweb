using Microsoft.AspNetCore.Authentication.JwtBearer;
using RxWeb.Core.Security;
using System;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using ContosoApplication.Infrastructure.Singleton;
using ContosoApplication.UnitOfWork.Main;

namespace ContosoApplication.Infrastructure.Security
{
    public class TokenAuthorizer : ITokenAuthorizer
    {
        public TokenAuthorizer(IJwtTokenProvider tokenProvider, UserAccessConfigInfo userAccessConfigInfo)
        {
            TokenProvider = tokenProvider;
            UserAccessConfigInfo = userAccessConfigInfo;
        }

        public Task AuthenticationFailed(AuthenticationFailedContext context)
        {
            throw new NotImplementedException();
        }

        public async Task Challenge(JwtBearerChallengeContext context)
        {
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json;";
            await context.Response.WriteAsync("Error Has Occured.");
        }

        public Task MessageReceived(MessageReceivedContext context)
        {
            var principal = this.ValidateTokenAsync(context.HttpContext).Result;
            if (principal != null)
            {
                context.Principal = principal;
                context.Success();
            }
            else
                context.Fail("  Token Not Found");
            return Task.CompletedTask;
        }

        public Task TokenValidated(TokenValidatedContext context)
        {
            throw new NotImplementedException();
        }

        public async Task<ClaimsPrincipal> ValidateTokenAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue(AUTHORIZATION_HEADER, out var token) && context.Request.Cookies.TryGetValue("request_identity", out var requestIdentity))
            {
                var loginUow = context.RequestServices.GetService(typeof(ILoginUow)) as ILoginUow;
                var dbToken = await UserAccessConfigInfo.GetTokenAsync(requestIdentity, loginUow);
                return string.IsNullOrEmpty(dbToken) ? null : this.TokenProvider.ValidateToken(requestIdentity, token);
            }
            return null;
        }

        public ClaimsPrincipal AnonymousUserValidateToken(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue(AUTHORIZATION_HEADER, out var token) && context.Request.Cookies.TryGetValue("anonymous", out var anonymousUser))
                return this.TokenProvider.ValidateToken(anonymousUser, token);
            return null;
        }

        private IJwtTokenProvider TokenProvider { get; set; }

        private UserAccessConfigInfo UserAccessConfigInfo { get; set; }

        private const string AUTHORIZATION_HEADER = "Authorization";

    }
}


