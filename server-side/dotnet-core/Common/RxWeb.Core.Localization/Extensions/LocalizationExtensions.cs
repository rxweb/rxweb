using Microsoft.Extensions.DependencyInjection;
using RxWeb.Core.Localization;
using RxWeb.Core.Localization.Singleton;
using System.Collections.Generic;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class LocalizationExtensions
    {
        public static void AddRxWebLocalization(this IServiceCollection serviceCollection, Dictionary<string, Dictionary<string, string>>  localizeKeys = null)
        {
            if (localizeKeys != null) {
                ApplicationLocalizationInfo.IsStaticMessages = true;
                ApplicationLocalizationInfo.LocalizeKeys = localizeKeys;
            }
            serviceCollection.AddScoped<ILocalizationInfo, LocalizationInfo>();
        }
    }
}
