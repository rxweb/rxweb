using Microsoft.AspNetCore.Http;
using RxWeb.Core.Annotations.Constants;
using System.Reflection;

namespace RxWeb.Core.Annotations
{
    public class RangeAttribute : BaseValidationAttribute, IValidator
    {

        public RangeAttribute(int allowMinimum,int allowMaximum, string messageKey = null, string conditionalExpressionName = null, string dynamicConfigExpressionName = null) : base("range", messageKey, conditionalExpressionName, dynamicConfigExpressionName)
        {
            this.Config.Add(ApplicationConstants.AllowMinimum, allowMinimum);
            this.Config.Add(ApplicationConstants.AllowMaximum, allowMaximum);
        }


        public string Validate(object entity, HttpContext httpContext, PropertyInfo property, ILocalizationInfo localizationInfo)
        {
            var propertyValue = property.GetValue(entity);
            if (this.IsContinue(entity))
            {
                if (this.HaveValue(propertyValue)) {
                    if(property.PropertyType == typeof(int))
                    {
                        var allowMinimum = (int)this.Config[ApplicationConstants.AllowMinimum];
                        var allowMaximum = (int)this.Config[ApplicationConstants.AllowMaximum];
                        var value = (int)propertyValue;
                        if (!(value >= allowMinimum && value <= allowMaximum))
                            this.Fail(localizationInfo);
                    }
                }
                    
            }
            return this.ValidationMessage;
        }
    }
}
