using AutoMapper;
using MediatR;
using TenderHack.Contracts;
using TenderHackServer.UseCases.Abstractions;
using TenderHackServer.UseCases.Cfg;

namespace TenderHackServer.UseCases.GetMessages;

public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, List<Message>>
{
    private readonly IMessageRepository _messageRepository;

    private readonly IMapper _mapper;

    public GetMessagesQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
        _mapper = MappingProfile.GetMapper();
    }

    public async Task<List<Message>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var result = await _messageRepository.GetMessagesByUserId(request.UserId);
        return _mapper.Map<List<Message>>(result);
    }
}
