using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RxWeb.Core.Security.JwtToken
{
    public class JwtTokenProvider : IJwtTokenProvider
    {
        private IDataProtector DataProtector { get; set; }
        public JwtTokenProvider(IDataProtectionProvider dataProtection,IHttpContextAccessor contextAccessor) {
            this.DataProtector = dataProtection.CreateProtector(typeof(JwtTokenProvider).FullName);
        }
        private bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken tokenToValidate, TokenValidationParameters @param)
        {
            if (expires != null)
                return expires > DateTime.UtcNow;
            return false;
        }

        public virtual ClaimsPrincipal ValidateToken(string securityKey, string jsonWebToken)
        {
            var decryptToken = jsonWebToken;
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
            var t = new TokenValidationParameters
            {
                IssuerSigningKey = symmetricSecurityKey,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateLifetime = true,
                LifetimeValidator = this.LifetimeValidator
            };
            SecurityToken sToken;
            var principal = new JwtSecurityTokenHandler().ValidateToken(decryptToken, t, out sToken);
            return principal;
        }

        public virtual KeyValuePair<string, string> WriteToken(IEnumerable<Claim> claims, string issuer, string audience, DateTime expires)
        {
            var securityKey = GetSymmetricKey();
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
              issuer: issuer,
              audience: audience,
              claims: claims,
              expires: expires,
              signingCredentials: credentials
              );
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            var keyObject = new KeyValuePair<string, string>(securityKey, jwtToken.ToString());
            return keyObject;
        }


        private string GetSymmetricKey()
        {
            using (var provider = new RNGCryptoServiceProvider())
            {
                byte[] secretKeyBytes = new Byte[32];
                provider.GetBytes(secretKeyBytes);
                return Convert.ToBase64String(secretKeyBytes);
            }
        }
    }
}
