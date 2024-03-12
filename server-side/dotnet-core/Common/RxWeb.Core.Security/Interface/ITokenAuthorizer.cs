using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace RxWeb.Core.Security
{
    public interface ITokenAuthorizer
    {
        Task AuthenticationFailed(AuthenticationFailedContext context);
        Task Challenge(JwtBearerChallengeContext context);
        Task MessageReceived(MessageReceivedContext context);
        Task TokenValidated(TokenValidatedContext context);
        Task<ClaimsPrincipal> ValidateTokenAsync(HttpContext context);

        ClaimsPrincipal AnonymousUserValidateToken(HttpContext context);
    }
}
