using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json;
using RxWeb.Core.Sanitizers.Extensions;
using System.Reflection;
using System.Runtime.Serialization;

namespace RxWeb.Core.Sanitizers.Formatters
{
    internal class InputJsonFormatter : IInputFormatter
    {
        [OnSerialized]
        public bool CanRead(InputFormatterContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            var contentType = context.HttpContext.Request.ContentType;
            if (contentType == null || contentType == "application/json")
                return true;
            return false;
        }

        public async Task<InputFormatterResult> ReadAsync(InputFormatterContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            var request = context.HttpContext.Request;
            if (request.ContentLength == 0)
            {
                if (context.ModelType.GetTypeInfo().IsValueType)
                    return await InputFormatterResult.SuccessAsync(Activator.CreateInstance(context.ModelType));
                else return await InputFormatterResult.SuccessAsync(null);
            }

            using (var reader = new StreamReader(context.HttpContext.Request.Body))
            {
                var data = await reader.ReadToEndAsync();
                if (!string.IsNullOrEmpty(data))
                {
                    var model = JsonConvert.DeserializeObject(data, context.ModelType);
                    if (!context.ModelType.FullName.Contains("System.Collections"))
                        model.Sanitize(context.HttpContext);
                    reader.Dispose();
                    reader.Close();
                    return await InputFormatterResult.SuccessAsync(model);
                }
                return await InputFormatterResult.SuccessAsync(null);
            }
        }
    }
}
