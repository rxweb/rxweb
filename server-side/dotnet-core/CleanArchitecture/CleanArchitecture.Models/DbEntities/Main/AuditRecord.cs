using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using CleanArchitecture.Models.Enums.Main;
using CleanArchitecture.BoundedContext.SqlContext;
namespace CleanArchitecture.Models.Main
{
    [Table("AuditRecords",Schema="dbo")]
    public partial class AuditRecord
    {
		#region AuditRecordId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion AuditRecordId Annotations

        public int AuditRecordId { get; set; }

		#region AuditRequestId Annotations

        [Range(1,int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("AuditRequests","dbo","","AuditRequestId")]
		#endregion AuditRequestId Annotations

        public int AuditRequestId { get; set; }

		#region KeyId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion KeyId Annotations

        public int KeyId { get; set; }


        public Nullable<int> CompositeKeyId { get; set; }

		#region EventType Annotations

        [Required]
        [MaxLength(10)]
		#endregion EventType Annotations

        public string EventType { get; set; }

		#region TableName Annotations

        [Required]
        [MaxLength(100)]
		#endregion TableName Annotations

        public string TableName { get; set; }

		#region AuditRequest Annotations

        [HasOne(foreignKeys: new string[] { nameof(AuditRequestId),}, nameof(CleanArchitecture.Models.Main.AuditRequest.AuditRecords))]
		#endregion AuditRequest Annotations

        public virtual AuditRequest AuditRequest { get; set; }


        public virtual ICollection<AuditRecordDetail> AuditRecordDetails { get; set; }


        public AuditRecord()
        {
			AuditRecordDetails = new HashSet<AuditRecordDetail>();
        }
	}
}