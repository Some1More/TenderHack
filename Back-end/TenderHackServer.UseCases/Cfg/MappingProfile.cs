using AutoMapper;

namespace TenderHackServer.UseCases.Cfg;

public class MappingProfile : Profile
{
    /// <summary>
    /// Создаёт экземпляр класса <see cref="MappingProfile"/>.
    /// </summary>
    public MappingProfile()
    {
        CreateMap<TenderHack.Core.Message, TenderHack.Contracts.Message>();

        CreateMap<DateTimeOffset, DateTime>()
            .ConstructUsing(dateTimeOffset => dateTimeOffset.LocalDateTime);
    }

    /// <summary>
    /// Инициализация автомаппера.
    /// </summary>
    /// <returns> Автомаппер. </returns>
    public static IMapper GetMapper()
    {
        var cfg = new MapperConfigurationExpression();
        cfg.AddProfile(new MappingProfile());
        return new Mapper(new MapperConfiguration(cfg));
    }
}