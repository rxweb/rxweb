using System.Security.Claims;

namespace RxWeb.Core.Security
{
    public interface IJwtTokenProvider
    {
        ClaimsPrincipal ValidateToken(string securityKey, string jsonWebToken);

        KeyValuePair<string, string> WriteToken(IEnumerable<Claim> claims, string issuer, string audience, DateTime expires);

    }
}
