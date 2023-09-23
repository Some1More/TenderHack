using AutoMapper;
using MediatR;
using TenderHack.Contracts;
using TenderHackServer.UseCases.Abstractions;
using TenderHackServer.UseCases.Cfg;

namespace TenderHackServer.UseCases.GetMessages;

public class GetMessagesQueryHandler : IStreamRequestHandler<GetMessagesQuery, Message>
{
    private readonly IMessageRepository _messageRepository;

    private readonly IMapper _mapper;

    public GetMessagesQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
        _mapper = MappingProfile.GetMapper();
    }

    public async IAsyncEnumerable<Message> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var result = _messageRepository.GetMessagesByUserId(request.UserId);
        
        foreach(var message in _mapper.Map<List<Message>>(result))
        {
            yield return message;
        }
    }
}
