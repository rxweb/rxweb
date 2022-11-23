using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RxWeb.Core.Common.Email;
using RxWeb.Core.Common.Models;

namespace RxWeb.Core.Common.Extensions
{
    public static class EmailServiceExtension
    {
        public static void AddEmailService(this IServiceCollection serviceCollection, IConfiguration configuration)
        {
            Configure(configuration.GetSection(EMAILTYPE).Value,serviceCollection,configuration);
        }

        private static void Configure(string emailType, IServiceCollection serviceCollection, IConfiguration configuration)
        {
            switch (emailType)
            {
                case STANDARD:
                    serviceCollection.AddScoped<IEmail, StandardEmail>();
                    var emailConfiguration = Newtonsoft.Json.JsonConvert.DeserializeObject<StandardEmailConfiguration>(configuration.GetSection("Email").Value);
                    serviceCollection.AddSingleton<StandardEmailConfiguration>(emailConfiguration);
                    break;
                case SENDGRID:
                    serviceCollection.AddScoped<IEmail, SendGridEmail>();
                    var sendGridEmailConfiguration = Newtonsoft.Json.JsonConvert.DeserializeObject<SendGridEmailConfiguration>(configuration.GetSection("Email").Value);
                    serviceCollection.AddSingleton<SendGridEmailConfiguration>(sendGridEmailConfiguration);
                    break;
                case MAILKIT:
                    serviceCollection.AddScoped<IEmail, MailKitEmail>();
                    var mailKitEmailConfiguration = Newtonsoft.Json.JsonConvert.DeserializeObject<MailKitEmailConfiguration>(configuration.GetSection("Email").Value);
                    serviceCollection.AddSingleton<MailKitEmailConfiguration>(mailKitEmailConfiguration);
                    break;
            }
        }

        const string STANDARD = "Standard";

        const string SENDGRID = "SendGrid";

        const string MAILKIT = "MailKit";

        const string EMAILTYPE = "EmailType";
    }
}
