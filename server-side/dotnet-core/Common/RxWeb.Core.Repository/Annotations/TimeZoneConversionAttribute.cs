using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RxWeb.Core.Data.Interface;
using RxWeb.Core.Data.Singleton;

namespace RxWeb.Core.Data.Annotations
{
    public class TimeZoneValueConversionAttribute : Attribute, ITimeZoneConverter
    {
        public TimeZoneValueConversionAttribute()
        {

        }

        public ValueConverter GetConverter(string timeZoneName)
        {
            var converter = new ValueConverter<DateTimeOffset, DateTimeOffset>(
                    v => (DateTimeOffset)v,
                    v => TimeZoneValueProvider.TransformValue(v, timeZoneName)
            );
            return converter;
        }
    }
}
