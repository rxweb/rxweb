using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RxWeb.Core.Common.Models;
using RxWeb.Core.Common.Sms;

namespace RxWeb.Core.Common.Extensions
{
    public static class SmsServiceExtension
    {
            public static void AddSmsService(this IServiceCollection serviceCollection, IConfiguration configuration) {
            Configure(configuration.GetSection(SMSTYPE).Value, serviceCollection, configuration);
        }
        private static void Configure(string emailType, IServiceCollection serviceCollection, IConfiguration configuration)
        {
            switch (emailType)
            {
                case TWILIO:
                    serviceCollection.AddScoped<ITextSms, TwilioSms>();
                    var smsConfiguration = Newtonsoft.Json.JsonConvert.DeserializeObject<TwilioSmsConfiguration>(configuration.GetSection("Sms").Value);
                    serviceCollection.AddSingleton<TwilioSmsConfiguration>(smsConfiguration);
                    break;
            }
        }

        const string TWILIO = "Twilio";

        const string SMSTYPE = "SmsType";
    }
}
