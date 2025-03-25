using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using PrimePro_Sample.Models.Enums.Main;
using PrimePro_Sample.BoundedContext.SqlContext;
namespace PrimePro_Sample.Models.Main
{
    [Table("AuditRequests",Schema="dbo")]
    public partial class AuditRequest
    {
		#region AuditRequestId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion AuditRequestId Annotations

        public int AuditRequestId { get; set; }

		#region TraceIdentifier Annotations

        [Required]
        [MaxLength(50)]
		#endregion TraceIdentifier Annotations

        public string TraceIdentifier { get; set; }

		#region KeyId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion KeyId Annotations

        public int KeyId { get; set; }


        public Nullable<int> CompositeKeyId { get; set; }


        public virtual ICollection<AuditRecord> AuditRecords { get; set; }


        public AuditRequest()
        {
			AuditRecords = new HashSet<AuditRecord>();
        }
	}
}