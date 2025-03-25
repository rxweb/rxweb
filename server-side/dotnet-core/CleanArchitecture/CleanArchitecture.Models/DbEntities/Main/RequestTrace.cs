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
    [Table("RequestTraces",Schema="dbo")]
    public partial class RequestTrace
    {
		#region TraceId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion TraceId Annotations

        public int TraceId { get; set; }

		#region TraceIdentifier Annotations

        [Required]
        [MaxLength(100)]
		#endregion TraceIdentifier Annotations

        public string TraceIdentifier { get; set; }


        public Nullable<int> UserId { get; set; }

		#region TraceType Annotations

        [Required]
        [MaxLength(10)]
		#endregion TraceType Annotations

        public string TraceType { get; set; }

		#region TraceTitle Annotations

        [Required]
        [MaxLength(200)]
		#endregion TraceTitle Annotations

        public string TraceTitle { get; set; }

		#region Uri Annotations

        [Required]
        [MaxLength(1024)]
		#endregion Uri Annotations

        public string Uri { get; set; }

		#region Verb Annotations

        [Required]
        [MaxLength(10)]
		#endregion Verb Annotations

        public string Verb { get; set; }

		#region ClientIp Annotations

        [Required]
        [MaxLength(50)]
		#endregion ClientIp Annotations

        public string ClientIp { get; set; }

		#region RequestHeader Annotations

        [Required]
		#endregion RequestHeader Annotations

        public string RequestHeader { get; set; }

		#region ResponseHeader Annotations

        [Required]
		#endregion ResponseHeader Annotations

        public string ResponseHeader { get; set; }

		#region StatusCode Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StatusCode Annotations

        public int StatusCode { get; set; }

		#region InTime Annotations

        [Required]
		#endregion InTime Annotations

        public System.DateTimeOffset InTime { get; set; }

		#region OutTime Annotations

        [Required]
		#endregion OutTime Annotations

        public System.DateTimeOffset OutTime { get; set; }


        public RequestTrace()
        {
        }
	}
}