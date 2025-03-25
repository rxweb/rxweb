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
    [Table("Department",Schema="dbo")]
    public partial class Department
    {
		#region DepartmentID Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion DepartmentID Annotations

        public int DepartmentID { get; set; }

		#region DepartmentName Annotations

        [Required]
        [MaxLength(100)]
		#endregion DepartmentName Annotations

        public string DepartmentName { get; set; }


        public virtual ICollection<Employee> Employee { get; set; }


        public Department()
        {
			Employee = new HashSet<Employee>();
        }
	}
}