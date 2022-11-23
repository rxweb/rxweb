using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Constants;
using System.Reflection;

namespace RxWeb.Core.Annotations
{
    public class RequiredAttribute : BaseValidationAttribute, IValidator
    {

        public RequiredAttribute(bool allowWhiteSpace = true, string messageKey = null, string conditionalExpressionName = null, string dynamicConfigExpressionName = null) : base("required", messageKey, conditionalExpressionName, dynamicConfigExpressionName)
        {
            this.Config.Add(ApplicationConstants.AllowWhiteSpace, allowWhiteSpace);
        }


        public string Validate(object entity, HttpContext httpContext, PropertyInfo property, ILocalizationInfo localizationInfo)
        {
            var propertyValue = property.GetValue(entity);
            if (this.IsContinue(entity))
            {
                if (!((bool)this.Config[ApplicationConstants.AllowWhiteSpace]))
                    propertyValue = (propertyValue as string).Trim();

                if (!this.HaveValue(propertyValue))
                    this.Fail(localizationInfo);
            }
            return this.ValidationMessage;
        }
    }
}
