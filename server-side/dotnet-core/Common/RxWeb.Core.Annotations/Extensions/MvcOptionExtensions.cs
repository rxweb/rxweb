using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Annotations.Conventions;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class MvcOptionExtensions
    {
        public static void AddValidation(this MvcOptions options)
        {
            options.Conventions.Add(new ModelValidationFilterConvention());
        }
    }
}
