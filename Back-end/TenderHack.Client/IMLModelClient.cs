using Refit;

namespace TenderHack.Client;

public interface IMLModelClient
{
    [Get("/Questions/GetAnswer")]
    Task<string> GetAnswerAsync([Query] string question);
}
