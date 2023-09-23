using MediatR;
using TenderHack.Contracts;

namespace TenderHackServer.UseCases.GetAnswer;

public class GetAnswerQuery : IRequest<Message>
{
    public string Question { get; }

    public GetAnswerQuery(string question)
    {
        Question = question;
    }
}
