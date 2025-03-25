using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using PrimePro_Sample.Models.Enums.Main;
using PrimePro_Sample.BoundedContext.SqlContext;
namespace PrimePro_Sample.Models.Main
{
    [Table("ComponentLanguageContents",Schema="dbo")]
    public partial class ComponentLanguageContent
    {
		#region ComponentLanguageContentId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ComponentLanguageContentId Annotations

        public int ComponentLanguageContentId { get; set; }

		#region ComponentKeyId Annotations

        [Range(1, int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("LanguageContentKeys","dbo","","ComponentKeyId")]
		#endregion ComponentKeyId Annotations

        public int ComponentKeyId { get; set; }

		#region LanguageContentId Annotations

        [Range(1, int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("LanguageContents","dbo","","LanguageContentId")]
		#endregion LanguageContentId Annotations

        public int LanguageContentId { get; set; }


        public string En { get; set; }


        public string Fr { get; set; }

		#region ComponentKey Annotations

        [HasOne(foreignKeys: new string[] { nameof(ComponentKeyId),}, nameof(PrimePro_Sample.Models.Main.LanguageContentKey.ComponentLanguageContents))]
		#endregion ComponentKey Annotations

        public virtual LanguageContentKey ComponentKey { get; set; }

		#region LanguageContent Annotations

        [HasOne(foreignKeys: new string[] { nameof(LanguageContentId),}, nameof(PrimePro_Sample.Models.Main.LanguageContent.ComponentLanguageContents))]
		#endregion LanguageContent Annotations

        public virtual LanguageContent LanguageContent { get; set; }


        public ComponentLanguageContent()
        {
        }
	}
}