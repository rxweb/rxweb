using Microsoft.AspNetCore.Http;
using System.Reflection;

namespace RxWeb.Core.Annotations
{
    public interface IValidator
    {
       string Validate(object value, HttpContext context,PropertyInfo property,ILocalizationInfo localizationInfo);
    }
}
