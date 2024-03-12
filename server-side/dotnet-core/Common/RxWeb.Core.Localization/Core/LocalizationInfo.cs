using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using RxWeb.Core.Localization.Singleton;
using System.Security.Claims;

namespace RxWeb.Core.Localization
{
    public class LocalizationInfo : ILocalizationInfo
    {
        public LocalizationInfo(IHttpContextAccessor contextAccessor, IHostingEnvironment hostingEnvironment)
        {
            ContextAccessor = contextAccessor;
            HostingEnvironment = hostingEnvironment;
        }


        public string CurrentLocale
        {
            get
            {
                var claim = ContextAccessor.HttpContext.User.Claims.Where(t => t.Type == ClaimTypes.Locality).SingleOrDefault();
                return claim != null ? claim.Value : "En";
            }
        }

        public string GetValidationMessage(string keyName)
        {
            var message = string.Empty;
            var currentLocale = this.CurrentLocale;
            if (!ApplicationLocalizationInfo.IsStaticMessages)
                ApplicationLocalizationInfo.Set(HostingEnvironment.WebRootPath, currentLocale);
            if (ApplicationLocalizationInfo.LocalizeKeys.ContainsKey(currentLocale))
                if (ApplicationLocalizationInfo.LocalizeKeys[currentLocale].ContainsKey(keyName))
                    message = ApplicationLocalizationInfo.LocalizeKeys[currentLocale][keyName];
            return message;
        }

        private IHttpContextAccessor ContextAccessor { get; set; }

        private IHostingEnvironment HostingEnvironment { get; set; }
    }
}
