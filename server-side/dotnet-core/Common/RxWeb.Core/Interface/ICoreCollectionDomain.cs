using System.Collections.Generic;
using System.Threading.Tasks;

namespace RxWeb.Core
{
    public interface ICoreCollectionDomain<T> 
    {
        HashSet<string> AddValidation(List<T> entity);
        HashSet<string> UpdateValidation(List<T> entity);
        Task AddAsync(List<T> entity);
        Task UpdateAsync(List<T> entity);
    }
}
