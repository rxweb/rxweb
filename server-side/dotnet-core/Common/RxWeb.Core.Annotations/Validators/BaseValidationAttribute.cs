using RxWeb.Core.Annotations.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace RxWeb.Core.Annotations
{
    public class BaseValidationAttribute : Attribute
    {
        private string ValidatorName { get; set; }
        protected string ValidationMessage { get; set; }
        protected Dictionary<string, object> Config { get; set; } = new Dictionary<string, object>();

        public BaseValidationAttribute(string _validatorName, string messageKey, string expressionName, string dynamicConfigExpressionName)
        {
            this.ValidatorName = _validatorName;
            Config.Add(ApplicationConstants.CustomMessageKey, messageKey);
            Config.Add(ApplicationConstants.ConditionalExpressionName, expressionName);
            Config.Add(ApplicationConstants.DynamicConfigExpressionName, dynamicConfigExpressionName);
        }

        public void RunConfigExpression(object entity)
        {
            var expressionName = this.Config[ApplicationConstants.DynamicConfigExpressionName] as string;
            if (!string.IsNullOrEmpty(expressionName))
            {
                MethodInfo methodInfo = GetMethodInfo(entity, expressionName);
                if (methodInfo != null)
                {
                    var result = methodInfo.Invoke(entity, new object[] { null }) as Dictionary<string, object>;
                    foreach (var item in result)
                        this.Config[item.Key] = item.Value;
                }
            }
        }

        public bool IsContinue(object entity)
        {
            this.RunConfigExpression(entity);
            var result = true;
            var expressionName = this.Config[ApplicationConstants.ConditionalExpressionName] as string;
            if (!string.IsNullOrEmpty(expressionName))
            {
                var methodInfo = GetMethodInfo(entity, expressionName);
                if (methodInfo != null)
                {
                    result = (bool)methodInfo.Invoke(entity, new object[] { entity });
                    return result;
                }
            }
            return result;
        }

        public bool HaveValue(object value)
        {


            var stringValue = value != null? Convert.ToString(value) : null;
            if (stringValue == null)
                return false;
            return !String.IsNullOrEmpty(stringValue);
        }


        
             



        public void Fail(ILocalizationInfo localizationInfo)
        {
            var messageKey = !string.IsNullOrEmpty(this.Config[ApplicationConstants.CustomMessageKey] as string) ? this.Config["CustomMessageKey"] as string : this.ValidatorName;
            this.ValidationMessage = localizationInfo.GetValidationMessage(messageKey);
            if (string.IsNullOrEmpty(this.ValidationMessage))
                this.ValidationMessage = ApplicationConstants.Invalid;
        }

        protected T GetMethodResult<T>(string methodName,object entity) {
            T result;
            if (!string.IsNullOrEmpty(methodName))
            {
                var methodInfo = GetMethodInfo(entity, methodName);
                if (methodInfo != null)
                {
                    result = (T)methodInfo.Invoke(entity,new object[] { });
                    return result;
                }
            }
            return default;
        } 

        private MethodInfo GetMethodInfo(object entity, string methodName)
        {
            return ((System.Reflection.TypeInfo)entity.GetType()).DeclaredMethods.Where(t => t.Name == methodName).SingleOrDefault();
        }
    }
}
