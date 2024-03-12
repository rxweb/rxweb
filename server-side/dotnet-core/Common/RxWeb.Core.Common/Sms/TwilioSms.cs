using RxWeb.Core.Common.Models;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace RxWeb.Core.Common.Sms
{
    public class TwilioSms : ITextSms
    {
        public TwilioSms(TwilioSmsConfiguration smsConfiguration) {
            SmsConfiguration = smsConfiguration;
        }
        public Task SendAsync(SmsConfig smsConfig)
        {
            TwilioClient.Init(SmsConfiguration.AccountSid, SmsConfiguration.AuthToken);
            var message = MessageResource.Create(
                 body: smsConfig.Body,
                 from: new Twilio.Types.PhoneNumber(smsConfig.From),
                 to: new Twilio.Types.PhoneNumber(smsConfig.To)
             );
            return Task.CompletedTask;
        }

        public TwilioSmsConfiguration SmsConfiguration { get; set; }
    }
}
