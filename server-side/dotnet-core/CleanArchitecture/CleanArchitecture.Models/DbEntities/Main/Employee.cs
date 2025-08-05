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
    [Table("Employee",Schema="dbo")]
    public partial class Employee
    {
		#region EmployeeID Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion EmployeeID Annotations

        public int EmployeeID { get; set; }

		#region EmployeeName Annotations

        [Required]
        [MaxLength(100)]
		#endregion EmployeeName Annotations

        public string EmployeeName { get; set; }

		#region DepartmentID Annotations

        [RelationshipTableAttribue("Department","dbo","","DepartmentID")]
		#endregion DepartmentID Annotations

        public Nullable<int> DepartmentID { get; set; }

		#region DepartmentIDNavigation Annotations

        [HasOne(foreignKeys: new string[] { nameof(DepartmentID),}, nameof(CleanArchitecture.Models.Main.Department.Employee))]
		#endregion DepartmentIDNavigation Annotations

        public virtual Department DepartmentIDNavigation { get; set; }


        public Employee()
        {
        }
	}
}