
using RxWeb.Core.Annotations;

namespace NewProjectSolution.Models.ViewModels
{
    public class UserConfig
    {
        [Required]        
        public string AudienceType { get; set; }

        public string LanguageCode { get; set; }
    }
}
