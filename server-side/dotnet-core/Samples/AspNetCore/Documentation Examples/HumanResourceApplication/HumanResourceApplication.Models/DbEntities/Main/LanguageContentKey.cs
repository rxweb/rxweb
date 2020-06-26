using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.Models.Enums.Main;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("LanguageContentKeys",Schema="dbo")]
    public partial class LanguageContentKey
    {
		#region LanguageContentKeyId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion LanguageContentKeyId Annotations

        public int LanguageContentKeyId { get; set; }

		#region KeyName Annotations

        [Required]
        [MaxLength(50)]
		#endregion KeyName Annotations

        public string KeyName { get; set; }

		#region IsComponent Annotations

        [Required]
		#endregion IsComponent Annotations

        public bool IsComponent { get; set; }

		#region LanguageContents Annotations

        [InverseProperty("LanguageContentKey")]
		#endregion LanguageContents Annotations

        public virtual ICollection<LanguageContent> LanguageContents { get; set; }

		#region ComponentLanguageContents Annotations

        [InverseProperty("LanguageContentKey")]
		#endregion ComponentLanguageContents Annotations

        public virtual ICollection<ComponentLanguageContent> ComponentLanguageContents { get; set; }


        public LanguageContentKey()
        {
			LanguageContents = new HashSet<LanguageContent>();
			ComponentLanguageContents = new HashSet<ComponentLanguageContent>();
        }
	}
}