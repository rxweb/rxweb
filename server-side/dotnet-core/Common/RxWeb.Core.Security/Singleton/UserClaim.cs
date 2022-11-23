using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace RxWeb.Core.Security
{
    public class UserClaim : IUserClaim
    {
        public UserClaim(IHttpContextAccessor contextAccessor) {
            ContextAccessor = contextAccessor;        
        }
        public string Email
        {
            get
            {
                return GetClaimValue(ClaimTypes.Email);
            }
        }

        public bool Anonymous
        {
            get
            {
                return GetClaimValue(ClaimTypes.Anonymous) != string.Empty;
            }
        }

        public string Locale
        {
            get
            {
                var locality = GetClaimValue(ClaimTypes.Locality);
                return locality != string.Empty ? locality :"En";
            }
        }

        public int CountryId
        {
            get
            {
                var country = GetClaimValue(ClaimTypes.Country);
                return country != string.Empty ? Convert.ToInt32(country) : 0;
            }
        }


        public string Uri
        {
            get
            {
                return GetClaimValue(ClaimTypes.Uri);
            }
        }

        
        public int UserId
        {
            get
            {
                var value = GetClaimValue(ClaimTypes.NameIdentifier);
                return value == string.Empty ? 0 : Convert.ToInt32(value);
            }
        }

        
        public string UserName
        {
            get
            {
                return GetClaimValue(ClaimTypes.Name);
            }
        }

        public string Get(string name)
        {
            return GetClaimValue(name);
        }

        private string GetClaimValue(string claim)
        {
            var claimObject = ContextAccessor.HttpContext.User.Claims.Where(t => t.Type == claim).SingleOrDefault();
            return (claimObject != null) ? claimObject.Value : string.Empty;
        }

        private IHttpContextAccessor ContextAccessor { get; set; }
    }
}
