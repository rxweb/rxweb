using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace RxWeb.Core.Logging
{
    public static class ExceptionLog
    {
        public static async Task<string> LogAsync(this Exception exception, HttpContext httpContext)
        {
            var requestBodyContent = string.Empty;
            using (StreamReader reader = new StreamReader(httpContext.Request.Body, Encoding.UTF8))
                requestBodyContent = await reader.ReadToEndAsync();
            var dictionary = new Dictionary<string, object>();
            dictionary.Add("TraceIdentifier", httpContext.TraceIdentifier);
            dictionary.Add("Message", exception.Message);
            dictionary.Add("ExceptionType", exception.GetType().ToString());
            dictionary.Add("ExceptionSource", exception.Source);
            dictionary.Add("StackTrace", exception.StackTrace);
            dictionary.Add("InnerExceptionMessage", exception.InnerException != null ? exception.InnerException.Message : string.Empty);
            dictionary.Add("InnerExceptionStackTrace", exception.InnerException != null ? exception.InnerException.StackTrace : string.Empty);
            dictionary.Add("RequestBody", requestBodyContent);
            dictionary.Add("CreatedDate", DateTime.UtcNow);
            httpContext.Items.Add("EXCEPTION", dictionary);
            return httpContext.TraceIdentifier;
        }
    }
}
