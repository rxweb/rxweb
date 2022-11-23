using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using $ext_safeprojectname$.Models.Enums.Main;
using $ext_safeprojectname$.BoundedContext.SqlContext;
namespace $ext_safeprojectname$.Models.Main
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

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public Status StatusId { get; set; }


        public ApplicationTimeZone()
        {
        }
	}
}