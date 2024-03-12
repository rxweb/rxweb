using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Sanitizers.Formatters;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class MvcOptionExtensions
    {
        public static void AddRxWebSanitizers(this MvcOptions options)
        {
            options.InputFormatters.Insert(0, new InputJsonFormatter());
        }
    }
}
