namespace RxWeb.Core.Common.Models
{
    public class StandardEmailConfiguration
    {
        public int Port { get; set; }

        public bool UseDefaultCredentials { get; set; }

        public bool EnableSsl { get; set; }

        public string Host { get; set; }

        public string PickupDirectoryLocation { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
