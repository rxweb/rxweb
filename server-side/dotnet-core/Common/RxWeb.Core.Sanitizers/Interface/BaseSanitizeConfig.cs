namespace RxWeb.Core.Sanitizers.Interface
{
    public interface BaseSanitizeConfig
    {
        Func<Object, Object, object> ConditionalExpression { get; set; }
    }
}
