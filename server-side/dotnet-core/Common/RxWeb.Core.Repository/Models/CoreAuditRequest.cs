namespace RxWeb.Core.Data.Models
{
    public class CoreAuditRequest
    {
        public string TraceIdentifier { get; set; }

        public int KeyId { get; set; }


        public Nullable<int> CompositeKeyId { get; set; }

        public virtual List<CoreAuditRecord> AuditRecords { get; set; }


        public CoreAuditRequest()
        {
            AuditRecords = new List<CoreAuditRecord>();
        }
    }
}
