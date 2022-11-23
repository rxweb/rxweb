using RxWeb.Core.Data.Models;
using System;
using System.Collections.Generic;

namespace RxWeb.Core.Data
{
    public interface IAuditLog
    {
        void Log(List<CoreAuditRecord> auditRecord);

        void OnException(Exception ex);
    }
}
