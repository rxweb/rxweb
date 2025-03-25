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
    [Table("ApplicationModules",Schema="dbo")]
    public partial class ApplicationModule
    {
		#region ApplicationModuleId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ApplicationModuleId Annotations

        public int ApplicationModuleId { get; set; }

		#region ModuleMasterId Annotations

        [Range(1, int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("ModuleMasters","dbo","","ModuleMasterId")]
		#endregion ModuleMasterId Annotations

        public int ModuleMasterId { get; set; }


        public Nullable<int> ParentApplicationModuleId { get; set; }

		#region ModuleMaster Annotations

        [HasOne(foreignKeys: new string[] { nameof(ModuleMasterId),}, nameof(CleanArchitecture.Models.Main.ModuleMaster.ApplicationModules))]
		#endregion ModuleMaster Annotations

        public virtual ModuleMaster ModuleMaster { get; set; }


        public virtual ICollection<RolePermission> RolePermissions { get; set; }


        public ApplicationModule()
        {
			RolePermissions = new HashSet<RolePermission>();
        }
	}
}