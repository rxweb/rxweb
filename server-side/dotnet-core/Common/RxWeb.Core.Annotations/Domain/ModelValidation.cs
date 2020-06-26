using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Extensions;
using RxWeb.Core.Annotations.Models;
using RxWeb.Core.Sanitizers.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Annotations
{
    public class ModelValidation : IModelValidation
    {
        public ValidationResultModel Validate(object value, HttpContext httpContext)
        {
            var resolveLocalization = (ILocalizationInfo)httpContext.RequestServices.GetService(typeof(ILocalizationInfo));
            var errors = new Dictionary<string, string>();
            if (value != null)
            {
                value.Sanitize(httpContext);
                var entityType = value.GetType();
                var properties = entityType.GetProperties();
                foreach (var property in properties)
                {
                    var attributes = property.GetCustomAttributes(true);
                    foreach (var attribute in attributes)
                    {
                        if (attribute is IValidator)
                        {
                            var errorMessage = ((IValidator)attribute).Validate(value, httpContext, property, resolveLocalization);
                            if (!string.IsNullOrEmpty(errorMessage))
                            {
                                errors.Add(property.Name.ToCamelCase(), errorMessage);
                                break;
                            }
                        }
                    }
                }
                if (errors.Count > 0)
                {
                    var modelValidation = entityType.GetCustomAttributes(typeof(ModelValidationAttribute), true).SingleOrDefault() as ModelValidationAttribute;
                    return this.CreateInvalidResponse(errors, resolveLocalization.GetValidationMessage(modelValidation != null ? modelValidation.KeyName : "validationTitle"));
                }
            }
            return null;
        }

        private ValidationResultModel CreateInvalidResponse(Dictionary<string, string> errors, string title)
        {

            var validationResult = new ValidationResultModel
            {
                Errors = errors,
                Status = 400,
                Title = title,
            };
            validationResult.Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1";
            return validationResult;
        }
    }
}
