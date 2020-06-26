using System;

namespace RxWeb.Core.Annotations
{
    public class ModelValidationAttribute : Attribute
    {
        public string KeyName { get; set; }
        public ModelValidationAttribute(string keyName) {
            KeyName = keyName;
        }
    }
}
