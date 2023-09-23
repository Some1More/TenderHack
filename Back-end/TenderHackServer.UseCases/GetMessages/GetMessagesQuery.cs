using MediatR;
using TenderHack.Contracts;

namespace TenderHackServer.UseCases.GetMessages;

public class GetMessagesQuery : IStreamRequest<Message>
{
    public int UserId { get; }

    public GetMessagesQuery(int userId)
    {
        UserId = userId;
    }
}
