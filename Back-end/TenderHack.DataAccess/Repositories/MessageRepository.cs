using Microsoft.EntityFrameworkCore;
using TenderHack.Core;
using TenderHackServer.UseCases.Abstractions;

namespace TenderHack.DataAccess.Repositories;

public class MessageRepository : IMessageRepository
{
    private readonly Context _context;

    public MessageRepository(Context context)
    {
        _context = context;
    }

    public IAsyncEnumerable<Message> GetMessagesByUserId(int userId)
    {
        return _context.Messages.Where(message => message.UserId == userId).AsAsyncEnumerable();
    }

    public async Task CreateMessage(Message message)
    {
        await _context.Messages.AddAsync(message);
        await _context.SaveChangesAsync();
    }
}
