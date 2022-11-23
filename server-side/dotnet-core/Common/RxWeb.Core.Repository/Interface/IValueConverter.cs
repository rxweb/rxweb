using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace RxWeb.Core.Data.Interface
{
    public interface IValueConverter
    {
        ValueConverter GetConverter();
    }
}
