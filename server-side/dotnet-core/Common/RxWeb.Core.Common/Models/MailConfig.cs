using System.Collections.Generic;
using System.IO;

namespace RxWeb.Core.Common
{
    public class MailConfig
    {
        public EmailFormatType EmailFormat { get; set; } = EmailFormatType.Html;

        public string From { get; set; }

        public List<string> To { get; set; } = new List<string>();

        public string Body { get; set; }

        public string Subject { get; set; }

        public Dictionary<string,Stream> Attachments { get; set; } = new Dictionary<string, Stream>();
           
    }
}
