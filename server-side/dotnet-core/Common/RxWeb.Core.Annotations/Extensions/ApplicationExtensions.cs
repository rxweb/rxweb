namespace RxWeb.Core.Annotations.Extensions
{
    internal static class ApplicationExtensions
    {
        public static string ToCamelCase(this string value)
        {
            return value.Remove(1, value.Length - 1).ToLower() + value.Remove(0, 1);
        }
    }
}
