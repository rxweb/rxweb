using System.Threading.Tasks;

namespace RxWeb.Core.Common
{
    public interface ITextSms
    {
        Task SendAsync(SmsConfig smsConfig);
    }
}
