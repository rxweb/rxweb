namespace RxWeb.Core
{
    public interface ILocalizationInfo
    {
        string CurrentLocale { get; }

        string GetValidationMessage(string keyName);
    }
}
