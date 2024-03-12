using RxWeb.Core.Data.Models;

namespace RxWeb.Core.Data
{
    public interface IAuditLog
    {
        void Log(List<CoreAuditRecord> auditRecord);

        void OnException(Exception ex);
    }
}
