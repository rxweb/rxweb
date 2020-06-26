using RxWeb.Core.Common.Models;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace RxWeb.Core.Common.Email
{
    public class StandardEmail : IEmail
    {
        public StandardEmail(StandardEmailConfiguration emailConfiguration)
        {
            EmailConfiguration = emailConfiguration;
            ConfigureSmtp();
        }

        public Task SendAsync(MailConfig config)
        {
            var mailMessage = GetMailMessage(config);
            SmtpClient.Send(mailMessage);
            return Task.CompletedTask;
        }

        private void ConfigureSmtp()
        {
            SmtpClient = new SmtpClient
            {
                Host = EmailConfiguration.Host,
                Port = EmailConfiguration.Port,
                UseDefaultCredentials = EmailConfiguration.UseDefaultCredentials,
                EnableSsl = EmailConfiguration.EnableSsl,
                Credentials = GetCredential()
            };
            if (string.IsNullOrEmpty(EmailConfiguration.PickupDirectoryLocation))
            {
                SmtpClient.PickupDirectoryLocation = EmailConfiguration.PickupDirectoryLocation;
                SmtpClient.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
            }
        }
        private MailMessage GetMailMessage(MailConfig config)
        {
            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(config.From);
            config.To.ForEach(t => mailMessage.To.Add(new MailAddress(t)));
            mailMessage.Subject = config.Subject;
            mailMessage.Body = config.Body;
            mailMessage.IsBodyHtml = config.EmailFormat == EmailFormatType.Html;
            AddAttachments(config, mailMessage);
            return mailMessage;
        }

        private void AddAttachments(MailConfig config, MailMessage mailMessage) {
            foreach (var attachment in config.Attachments) 
                mailMessage.Attachments.Add(new Attachment(attachment.Value, attachment.Key));
        }

        private NetworkCredential GetCredential()
        {
            return new NetworkCredential(EmailConfiguration.UserName, EmailConfiguration.Password);
        }
        private StandardEmailConfiguration EmailConfiguration { get; set; }
        private SmtpClient SmtpClient { get; set; }
    }
}
