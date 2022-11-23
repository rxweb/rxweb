﻿using Microsoft.AspNetCore.Http;
using System;

namespace RxWeb.Core.Sanitizers.Interface
{
    public interface IActionSanitizer
    {
        Object Sanitize(object value, HttpContext context);
    }
}
