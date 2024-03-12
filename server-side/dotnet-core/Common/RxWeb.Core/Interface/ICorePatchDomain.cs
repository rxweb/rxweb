namespace RxWeb.Core
{
    public interface ICorePatchDomain<T, FromQuery> : ICoreDomain<T, FromQuery>
    {
        T PatchEntity(int id);
    }
}
