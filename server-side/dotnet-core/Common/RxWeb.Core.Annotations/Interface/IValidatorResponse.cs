using System.Collections.Generic;

namespace RxWeb.Core.Annotations.Interface
{
    public interface IValidatorResponse
    {
        object CreateInvalidResponse(Dictionary<string, string> errors, string title);
    }
}
