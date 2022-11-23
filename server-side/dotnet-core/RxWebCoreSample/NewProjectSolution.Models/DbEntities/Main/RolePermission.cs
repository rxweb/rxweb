using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using NewProjectSolution.Models.Enums.Main;
using NewProjectSolution.BoundedContext.SqlContext;
namespace NewProjectSolution.Models.Main
{
    [Table("RolePermissions",Schema="dbo")]
    public partial class RolePermission
    {
		#region RolePermissionId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion RolePermissionId Annotations

        public int RolePermissionId { get; set; }

		#region RoleId Annotations

        [Range(1,int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("Roles","dbo","","RoleId")]
		#endregion RoleId Annotations

        public int RoleId { get; set; }

		#region ApplicationModuleId Annotations

        [Range(1,int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("ApplicationModules","dbo","","ApplicationModuleId")]
		#endregion ApplicationModuleId Annotations

        public int ApplicationModuleId { get; set; }


        public Nullable<bool> CanView { get; set; }


        public Nullable<bool> CanAdd { get; set; }


        public Nullable<bool> CanEdit { get; set; }


        public Nullable<bool> CanDelete { get; set; }

		#region PermissionPriority Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion PermissionPriority Annotations

        public int PermissionPriority { get; set; }

		#region ApplicationModule Annotations

        [ForeignKey(nameof(ApplicationModuleId))]
        [InverseProperty(nameof(NewProjectSolution.Models.Main.ApplicationModule.RolePermissions))]
		#endregion ApplicationModule Annotations

        public virtual ApplicationModule ApplicationModule { get; set; }

		#region Role Annotations

        [ForeignKey(nameof(RoleId))]
        [InverseProperty(nameof(NewProjectSolution.Models.Main.Role.RolePermissions))]
		#endregion Role Annotations

        public virtual Role Role { get; set; }


        public RolePermission()
        {
        }
	}
}