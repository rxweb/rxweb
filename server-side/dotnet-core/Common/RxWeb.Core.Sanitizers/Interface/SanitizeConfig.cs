namespace RxWeb.Core.Sanitizers.Interface
{
    public interface SanitizeConfig : BaseSanitizeConfig
    {
        Func<Object,Object,Object> Sanitizer { get; set; }
    }
}
