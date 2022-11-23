using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace RxWeb.Core.Data.Interface
{
    public interface ITimeZoneConverter
    {
        ValueConverter GetConverter(string timeZoneName);
    }
}
