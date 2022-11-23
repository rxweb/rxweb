using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using ContosoApplication.BoundedContext.SqlContext;
namespace ContosoApplication.Models.Main
{
    [Table("vCourseLookups",Schema="dbo")]
    public partial class vCourseLookup
    {
		#region CourseId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion CourseId Annotations

        public int CourseId { get; set; }


        public string CourseName { get; set; }


        public vCourseLookup()
        {
        }
	}
}