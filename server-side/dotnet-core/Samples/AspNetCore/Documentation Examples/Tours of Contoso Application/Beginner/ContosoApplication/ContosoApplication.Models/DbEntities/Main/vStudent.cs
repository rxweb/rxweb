using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using ContosoApplication.BoundedContext.SqlContext;
namespace ContosoApplication.Models.Main
{
    [Table("vStudents",Schema="dbo")]
    public partial class vStudent
    {
		#region RollNumber Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion RollNumber Annotations

        public int RollNumber { get; set; }


        public string StudentName { get; set; }


        public string EmailId { get; set; }


        public string CourseName { get; set; }


        public vStudent()
        {
        }
	}
}