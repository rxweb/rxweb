using MailKit.Net.Smtp;
using MimeKit;
using RxWeb.Core.Common.Models;
using System.Linq;
using System.Threading.Tasks;

namespace RxWeb.Core.Common.Email
{
    public class MailKitEmail : IEmail
    {
        public MailKitEmail(MailKitEmailConfiguration emailConfiguration)
        {
            EmailConfiguration = emailConfiguration;
        }


        public Task SendAsync(MailConfig config)
        {
            var mailMessage = GetMailMessage(config);
            using (var emailClient = new SmtpClient())
            {

                emailClient.Connect(EmailConfiguration.Host, EmailConfiguration.Port, false);
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
                emailClient.Authenticate(EmailConfiguration.UserName, EmailConfiguration.Password);
                emailClient.Send(mailMessage);
                emailClient.Disconnect(true);
            }
            return Task.CompletedTask;
        }

       
        private MimeMessage GetMailMessage(MailConfig config)
        {
            var message = new MimeMessage();
            message.To.AddRange(config.To.Select(x => new MailboxAddress(string.Empty, x)));
            message.From.Add(new MailboxAddress(string.Empty, config.From));
            message.Subject = config.Subject;
            TextPart body;
            if (config.EmailFormat == EmailFormatType.Html)
                body = new TextPart(MimeKit.Text.TextFormat.Html);
            else
                body = new TextPart(MimeKit.Text.TextFormat.Text);
            body.Text = config.Body;
            Multipart multipart;
            if (config.Attachments.Count > 0)
                multipart = new Multipart("mixed");
            else
                multipart = new Multipart();
            multipart.Add(body);
            message.Body = multipart;
            AddAttachments(config, multipart);
            return message;
        }

        private void AddAttachments(MailConfig config, Multipart multipart)
        {
            foreach (var attachment in config.Attachments)
            {
                var mimePart = new MimePart()
                {
                    Content = new MimeContent(attachment.Value, ContentEncoding.Default),
                    ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                    ContentTransferEncoding = ContentEncoding.Default,
                    FileName = attachment.Key
                };
                multipart.Add(mimePart);
            }
        }

        private SmtpClient SmtpClient { get; set; }
        private MailKitEmailConfiguration EmailConfiguration { get; set; }
    }
}
