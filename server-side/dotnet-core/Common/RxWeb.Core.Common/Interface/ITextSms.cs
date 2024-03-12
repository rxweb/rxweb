namespace RxWeb.Core.Common
{
    public interface ITextSms
    {
        Task SendAsync(SmsConfig smsConfig);
    }
}
