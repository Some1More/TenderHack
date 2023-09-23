using AutoMapper;
using MediatR;
using TenderHack.Contracts;
using TenderHackServer.UseCases.Abstractions;
using TenderHackServer.UseCases.Cfg;

namespace TenderHackServer.UseCases.GetAnswer;

public class GetAnswerQueryHandler : IRequestHandler<GetAnswerQuery, Message>
{
    private readonly IMachineLearningRepository _mlRepository;

    private readonly IMessageRepository _messageRepository;

    private readonly IMapper _mapper;

    public GetAnswerQueryHandler(IMachineLearningRepository mlRepository, IMessageRepository messageRepository)
    {
        _mlRepository = mlRepository;
        _messageRepository = messageRepository;
        _mapper = MappingProfile.GetMapper();
    }

    public async Task<Message> Handle(GetAnswerQuery request, CancellationToken cancellationToken)
    {
        await _messageRepository.CreateMessage(new TenderHack.Core.Message()
        {
            CreationDate = DateTime.Now,
            UserId = 0,
            Value = request.Question,
            IsBot = false
        });

        var answer = await _mlRepository.GetAnswer(request.Question);
        var answerModel = new TenderHack.Core.Message()
        {
            CreationDate = DateTime.Now,
            UserId = 0,
            Value = answer,
            IsBot = true
        };

        await _messageRepository.CreateMessage(answerModel);

        return _mapper.Map<Message>(answerModel);
    }
}
