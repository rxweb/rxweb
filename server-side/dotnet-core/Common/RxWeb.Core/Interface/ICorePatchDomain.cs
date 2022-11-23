using System;
using System.Collections.Generic;
using System.Text;

namespace RxWeb.Core
{
    public interface ICorePatchDomain<T, FromQuery> : ICoreDomain<T, FromQuery>
    {
        T PatchEntity(int id);
    }
}
