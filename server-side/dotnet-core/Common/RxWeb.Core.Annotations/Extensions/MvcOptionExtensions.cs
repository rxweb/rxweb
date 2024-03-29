﻿using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Annotations.Conventions;
using RxWeb.Core.Annotations.Static;

namespace RxWeb.Core.AspNetCore.Extensions
{
    public static class MvcOptionExtensions
    {
        public static void AddValidation(this MvcOptions options,Type type = null)
        {
            ValidatorResponse.Response = type;
            options.Conventions.Add(new ModelValidationFilterConvention());
        }
    }
}
