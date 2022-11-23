using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using ContosoApplication.Models.Enums.Main;
using ContosoApplication.BoundedContext.SqlContext;
namespace ContosoApplication.Models.Main
{
    [Table("Roles",Schema="dbo")]
    public partial class Role
    {
		#region RoleId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion RoleId Annotations

        public int RoleId { get; set; }

		#region RoleName Annotations

        [Required]
        [MaxLength(50)]
		#endregion RoleName Annotations

        public string RoleName { get; set; }

		#region StatusId Annotations

        [Range(1, int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public Status StatusId { get; set; }

		#region UserRoles Annotations

        [InverseProperty("Role")]
		#endregion UserRoles Annotations

        public virtual ICollection<UserRole> UserRoles { get; set; }

		#region RolePermissions Annotations

        [InverseProperty("Role")]
		#endregion RolePermissions Annotations

        public virtual ICollection<RolePermission> RolePermissions { get; set; }


        public Role()
        {
			UserRoles = new HashSet<UserRole>();
			RolePermissions = new HashSet<RolePermission>();
        }
	}
}