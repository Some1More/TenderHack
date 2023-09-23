using Microsoft.EntityFrameworkCore;
using TenderHack.Core;

namespace TenderHack.DataAccess;

public class Context : DbContext
{
    public DbSet<Message> Messages { get; set; }

    /// <summary>
    /// Создаёт экземпляр класса <see cref="Context"/>.
    /// </summary>
    public Context()
    {
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }

    /// <summary>
    /// Настраивает параметры подключения к БД.
    /// </summary>
    /// <param name="optionsBuilder"> Класс-строитель параметров подключения к БД. </param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source = TenderHack.db");
    }
}
