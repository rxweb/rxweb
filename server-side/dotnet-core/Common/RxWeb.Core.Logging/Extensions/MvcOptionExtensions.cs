using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Logging.Filters;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class MvcOptionExtensions
    {
        public static void AddTracing(this MvcOptions options)
        {
            options.Filters.Add(new RequestTracing());
        }
    }
}
