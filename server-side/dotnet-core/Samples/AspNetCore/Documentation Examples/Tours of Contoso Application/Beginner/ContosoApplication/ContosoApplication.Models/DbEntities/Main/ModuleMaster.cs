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
    [Table("ModuleMasters",Schema="dbo")]
    public partial class ModuleMaster
    {
		#region ModuleMasterId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ModuleMasterId Annotations

        public int ModuleMasterId { get; set; }

		#region ModuleMasterName Annotations

        [Required]
        [MaxLength(100)]
		#endregion ModuleMasterName Annotations

        public string ModuleMasterName { get; set; }

		#region StatusId Annotations

        [Range(1, int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public Status StatusId { get; set; }

		#region ApplicationModules Annotations

        [InverseProperty("ModuleMaster")]
		#endregion ApplicationModules Annotations

        public virtual ICollection<ApplicationModule> ApplicationModules { get; set; }


        public ModuleMaster()
        {
			ApplicationModules = new HashSet<ApplicationModule>();
        }
	}
}