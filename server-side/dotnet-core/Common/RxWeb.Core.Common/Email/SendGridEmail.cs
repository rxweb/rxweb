using RxWeb.Core.Common.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RxWeb.Core.Common.Email
{
    public class SendGridEmail : IEmail
    {

        public SendGridEmail(SendGridEmailConfiguration emailConfiguration) {
            EmailConfiguration = emailConfiguration;
            Configure();
        }

        public Task SendAsync(MailConfig config)
        {
            var mailMessage = GetMailMessage(config);
            SendClient.SendEmailAsync(mailMessage);
            return Task.CompletedTask;
        }

        private SendGridMessage GetMailMessage(MailConfig config) {
            var from = new EmailAddress(config.From);
            var tos = new List<EmailAddress>();
            config.To.ForEach(t => tos.Add(new EmailAddress(t)));
            var htmlContent = string.Empty;
            var textContent = string.Empty;
            if (config.EmailFormat == EmailFormatType.Html)
                htmlContent = config.Body;
            else
                textContent = config.Body;
            var mailMessage = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, config.Subject, textContent, htmlContent);
            AddAttachments(config, mailMessage);
            return mailMessage;
        }

        private void AddAttachments(MailConfig config, SendGridMessage mailMessage) {
            foreach (var attachment in config.Attachments)
                mailMessage.AddAttachmentAsync(attachment.Key,attachment.Value);
        }

        private void Configure() {
            SendClient = new SendGridClient(EmailConfiguration.ApiKey);
        }

        private SendGridEmailConfiguration EmailConfiguration { get; set; }
        private SendGridClient SendClient { get; set; }
    }
}
