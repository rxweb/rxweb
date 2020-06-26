using System.Collections.Generic;
using System.Threading.Tasks;

namespace RxWeb.Core
{
    public interface ICoreDomain<T,FromQuery>
    {
        Task<object> GetAsync(FromQuery parameters);
        Task<object> GetBy(FromQuery parameters);

        HashSet<string> AddValidation(T entity);
        HashSet<string> UpdateValidation(T entity);

        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        HashSet<string> DeleteValidation(FromQuery parameters);
        Task DeleteAsync(FromQuery parameters);
    }
}
