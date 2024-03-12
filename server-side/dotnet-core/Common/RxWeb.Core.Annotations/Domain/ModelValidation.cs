using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Extensions;
using RxWeb.Core.Annotations.Interface;
using RxWeb.Core.Annotations.Models;
using RxWeb.Core.Annotations.Static;
using RxWeb.Core.Sanitizers.Extensions;

namespace RxWeb.Core.Annotations
{
    public class ModelValidation : IModelValidation
    {
        private IValidatorResponse ResponseValidation { get; set; }
        public object Validate(object value, HttpContext httpContext)
        {
            var resolveLocalization = (ILocalizationInfo)httpContext.RequestServices.GetService(typeof(ILocalizationInfo));
            ResponseValidation = ValidatorResponse.Response != null ? (IValidatorResponse)httpContext.RequestServices.GetService(ValidatorResponse.Response) : null;
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

        private object CreateInvalidResponse(Dictionary<string, string> errors, string title)
        {
            return ResponseValidation != null ? ResponseValidation.CreateInvalidResponse(errors, title) : new ValidationResultModel
            {
                Errors = errors,
                Status = 400,
                Title = title,
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1"
            };
        }
    }
}
