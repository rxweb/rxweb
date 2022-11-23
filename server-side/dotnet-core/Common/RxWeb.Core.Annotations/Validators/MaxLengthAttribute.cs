using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Constants;
using System.Reflection;

namespace RxWeb.Core.Annotations
{
    public class MaxLengthAttribute : BaseValidationAttribute, IValidator
    {

        public MaxLengthAttribute(int allowMaximumLength, string messageKey = null, string conditionalExpressionName = null, string dynamicConfigExpressionName = null) : base("propRange", messageKey, conditionalExpressionName, dynamicConfigExpressionName)
        {
            this.Config.Add(ApplicationConstants.AllowMaximumLength, allowMaximumLength);
        }


        public string Validate(object entity, HttpContext httpContext, PropertyInfo property, ILocalizationInfo localizationInfo)
        {
            var propertyValue = property.GetValue(entity);
            if (this.IsContinue(entity))
            {
                if (this.HaveValue(propertyValue))
                {
                    var value = propertyValue as string;
                    var allowMaximumLength = (int)this.Config[ApplicationConstants.AllowMaximumLength];
                    if (!(value.Length <= allowMaximumLength))
                        this.Fail(localizationInfo);
                }
            }
            return this.ValidationMessage;
        }
    }
}
