using TenderHack.Core;

namespace TenderHackServer.UseCases.Abstractions;

public interface IMessageRepository
{
    Task<List<Message>> GetMessagesByUserId(int userId);

    Task CreateMessage(Message message);
}
