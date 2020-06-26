namespace RxWeb.Core.Security.Cryptography
{
    public class PasswordResult
    {
        public byte[] Signature { get; set; }

        public byte[] Salt { get; set; }
    }
}
