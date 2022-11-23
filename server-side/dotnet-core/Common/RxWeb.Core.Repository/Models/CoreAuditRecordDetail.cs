namespace RxWeb.Core.Data.Models
{
    public class CoreAuditRecordDetail
    {
        public string ColumnName { get; set; }


        public string OldValue { get; set; }


        public string NewValue { get; set; }

        public CoreAuditRecordDetail()
        {
        }
    }
}
