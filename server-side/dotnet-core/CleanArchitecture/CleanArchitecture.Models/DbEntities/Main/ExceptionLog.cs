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
    [Table("ExceptionLogs",Schema="dbo")]
    public partial class ExceptionLog
    {
		#region ExceptionLogId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ExceptionLogId Annotations

        public int ExceptionLogId { get; set; }

		#region TraceIdentifier Annotations

        [Required]
        [MaxLength(100)]
		#endregion TraceIdentifier Annotations

        public string TraceIdentifier { get; set; }

		#region Message Annotations

        [Required]
        [MaxLength(500)]
		#endregion Message Annotations

        public string Message { get; set; }

		#region ExceptionType Annotations

        [Required]
        [MaxLength(200)]
		#endregion ExceptionType Annotations

        public string ExceptionType { get; set; }

		#region ExceptionSource Annotations

        [Required]
		#endregion ExceptionSource Annotations

        public string ExceptionSource { get; set; }

		#region StackTrace Annotations

        [Required]
		#endregion StackTrace Annotations

        public string StackTrace { get; set; }

		#region InnerExceptionMessage Annotations

        [MaxLength(200)]
		#endregion InnerExceptionMessage Annotations

        public string InnerExceptionMessage { get; set; }


        public string InnerExceptionStackTrace { get; set; }


        public string RequestBody { get; set; }

		#region CreatedDate Annotations

        [Required]
		#endregion CreatedDate Annotations

        public System.DateTimeOffset CreatedDate { get; set; }


        public ExceptionLog()
        {
        }
	}
}