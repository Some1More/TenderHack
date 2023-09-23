using MediatR;

namespace TenderHackServer.UseCases.GetAnswer;

public class GetAnswerQuery : IRequest<string>
{
    public string Question { get; }

    public GetAnswerQuery(string question)
    {
        Question = question;
    }
}
