using System;

namespace RxWeb.Core.Data.Annotations
{
    public class ValueConversionAttribute : Attribute
    {

        public Type ConversionType { get; set; }
        public ValueConversionAttribute(Type type)
        {
            ConversionType = type;
        }
    }
}
