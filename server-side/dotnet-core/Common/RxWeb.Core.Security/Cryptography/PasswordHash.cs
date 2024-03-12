using System.Security.Cryptography;
using System.Text;

namespace RxWeb.Core.Security.Cryptography
{
    public class PasswordHash : IPasswordHash
    {
        public PasswordHash() {
            
        }

        public PasswordResult Encrypt(string password)
        {
            var result = new PasswordResult();
            InitKeys();
            var signature = CreateSignature(Encoding.UTF8.GetBytes(password),KeysSignature);
            result.Signature = signature;
            result.Salt = PublicKeyBlob;
            return result;
        }

        public bool VerifySignature(string password, byte[] signature,byte[] salt)
        {
            bool retValue = false;
            using (CngKey key = CngKey.Import(salt, CngKeyBlobFormat.GenericPublicBlob))
            using (var signingAlg = new ECDsaCng(key))
            {
                //#if NET46
                retValue = signingAlg.VerifyData(Encoding.UTF8.GetBytes(password), signature);
                signingAlg.Clear();
                //#else
                //    retValue = signingAlg.VerifyData(data, signature, HashAlgorithmName.SHA512);
                //#endif
            }
            return retValue;
        }

        private byte[] CreateSignature(byte[] data, CngKey key)
        {
            byte[] signature;
            using (var signingAlg = new ECDsaCng(key))
            {
                //#if NET46
                signature = signingAlg.SignData(data);
                signingAlg.Clear();
                //#else
                //  signature = signingAlg.SignData(data, HashAlgorithmName.SHA512);
                //#endif
            }
            return signature;
        }

        private void InitKeys()
        {
            KeysSignature = CngKey.Create(CngAlgorithm.ECDsaP521);
            PublicKeyBlob = KeysSignature.Export(CngKeyBlobFormat.GenericPublicBlob);
        }

        private CngKey KeysSignature;
        private byte[] PublicKeyBlob;
    }

    public interface IPasswordHash
    {
       PasswordResult Encrypt(string password);
        bool VerifySignature(string password, byte[] signature, byte[] salt);
    }
}
