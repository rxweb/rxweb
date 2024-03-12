using NodaTime;

namespace RxWeb.Core.Data.Singleton
{
    public static class TimeZoneValueProvider
    {
        public static DateTimeOffset TransformValue(DateTimeOffset value,string timeZoneName) {
            if (value > DateTimeOffset.MinValue) {
                var zoneProvider = DateTimeZoneProviders.Tzdb[timeZoneName];
                var zoneDateTime = Instant.FromDateTimeUtc(value.UtcDateTime)
                              .InZone(zoneProvider)
                              .ToDateTimeUnspecified();
                return zoneDateTime;
            }
            return value;
        }
    }
}
