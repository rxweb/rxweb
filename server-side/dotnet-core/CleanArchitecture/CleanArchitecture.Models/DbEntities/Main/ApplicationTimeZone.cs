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
    [Table("ApplicationTimeZones",Schema="dbo")]
    public partial class ApplicationTimeZone
    {
		#region ApplicationTimeZoneId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ApplicationTimeZoneId Annotations

        public int ApplicationTimeZoneId { get; set; }

		#region ApplicationTimeZoneName Annotations

        [Required]
        [MaxLength(100)]
		#endregion ApplicationTimeZoneName Annotations

        public string ApplicationTimeZoneName { get; set; }

		#region Comment Annotations

        [Required]
        [MaxLength(200)]
		#endregion Comment Annotations

        public string Comment { get; set; }

		#region StatusId Annotations

        [Range(1, int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public Status StatusId { get; set; }


        public ApplicationTimeZone()
        {
        }
	}
}