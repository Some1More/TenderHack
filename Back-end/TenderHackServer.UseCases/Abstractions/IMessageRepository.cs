using TenderHack.Core;

namespace TenderHackServer.UseCases.Abstractions;

public interface IMessageRepository
{
    IAsyncEnumerable<Message> GetMessagesByUserId(int userId);

    Task CreateMessage(Message message);
}
