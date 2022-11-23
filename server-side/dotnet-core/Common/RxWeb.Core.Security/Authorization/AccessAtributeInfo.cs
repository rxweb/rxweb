using System;
using System.Collections.Generic;
using System.Text;

namespace RxWeb.Core.Security.Authorization
{
    public class AccessAtributeInfo
    {
        public string ActionType { get; set; }

        public Type HaveAccess { get; set; }
    }
}
