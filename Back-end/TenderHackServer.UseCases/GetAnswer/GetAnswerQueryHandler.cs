using MediatR;
using TenderHackServer.UseCases.Abstractions;

namespace TenderHackServer.UseCases.GetAnswer;

public class GetAnswerQueryHandler : IRequestHandler<GetAnswerQuery, string>
{
    private readonly IMachineLearningRepository _mlRepository;

    private readonly IMessageRepository _messageRepository;

    public GetAnswerQueryHandler(IMachineLearningRepository mlRepository, IMessageRepository messageRepository)
    {
        _mlRepository = mlRepository;
        _messageRepository = messageRepository;
    }

    public async Task<string> Handle(GetAnswerQuery request, CancellationToken cancellationToken)
    {
        await _messageRepository.CreateMessage(new TenderHack.Core.Message()
        {
            CreationDate = DateTime.Now,
            UserId = 0,
            Value = request.Question,
            IsBot = false
        });

        var answer = await _mlRepository.GetAnswer(request.Question);

        await _messageRepository.CreateMessage(new TenderHack.Core.Message()
        {
            CreationDate = DateTime.Now,
            UserId = 0,
            Value = answer,
            IsBot = true
        });

        return answer;
    }
}
