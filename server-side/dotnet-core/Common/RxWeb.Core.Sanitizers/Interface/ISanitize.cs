using System;

namespace RxWeb.Core.Sanitizers.Interface
{
    internal interface ISanitize
    {
        Object Sanitize(Object value, Object entity,object rootEntity);
    }
}
