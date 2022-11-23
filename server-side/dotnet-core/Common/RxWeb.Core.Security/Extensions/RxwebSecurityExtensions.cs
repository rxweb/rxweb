using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using RxWeb.Core.Security;
using RxWeb.Core.Security.Authorization;
using RxWeb.Core.Security.Cryptography;
using RxWeb.Core.Security.JwtToken;

namespace RxWeb.Core.Extensions
{
    public static class RxwebSecurityExtensions
    {
        public static void AddRxWebAuthorization(this IServiceCollection serviceCollection) {
            serviceCollection.AddSingleton<IAuthorizationPolicyProvider, AccessPolicyProvider>();
            serviceCollection.AddSingleton<IAuthorizationHandler, AuthorizationPermissionHandler>();
        }
        public static void AddRxWebJwtAuthentication(this IServiceCollection serviceCollection) {
            serviceCollection.AddScoped<IJwtTokenProvider, JwtTokenProvider>();
            serviceCollection.AddScoped<IUserClaim, UserClaim>();
            serviceCollection.AddScoped<IPasswordHash, PasswordHash>();
            serviceCollection.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        var tokenAuthentication = context.HttpContext.RequestServices.GetRequiredService<ITokenAuthorizer>();
                        return tokenAuthentication.AuthenticationFailed(context);
                    },
                    OnTokenValidated = context =>
                    {
                        var tokenAuthentication = context.HttpContext.RequestServices.GetRequiredService<ITokenAuthorizer>();
                        return tokenAuthentication.TokenValidated(context);
                    },
                    OnMessageReceived = context =>
                    {
                        var tokenAuthentication = context.HttpContext.RequestServices.GetRequiredService<ITokenAuthorizer>();
                        return tokenAuthentication.MessageReceived(context);
                    },
                    OnChallenge = context =>
                    {
                        var tokenAuthentication = context.HttpContext.RequestServices.GetRequiredService<ITokenAuthorizer>();
                        return tokenAuthentication.Challenge(context);
                    }
                };
            });
        }
    }
}
