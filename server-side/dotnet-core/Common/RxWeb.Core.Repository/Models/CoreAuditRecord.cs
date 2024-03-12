namespace RxWeb.Core.Data.Models
{
    public class CoreAuditRecord
    {
        public int KeyId { get; set; }

        public Nullable<int> CompositeKeyId { get; set; }

        public string EventType { get; set; }

        public string TableName { get; set; }

        public IList<CoreAuditRecordDetail> AuditRecordDetails { get; set; }

        public CoreAuditRecord()
        {
            this.AuditRecordDetails = new List<CoreAuditRecordDetail>();
        }
    }
}
