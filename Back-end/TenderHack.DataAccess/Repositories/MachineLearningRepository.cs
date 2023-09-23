using TenderHack.Client;
using TenderHackServer.UseCases.Abstractions;

namespace TenderHack.DataAccess.Repositories;

public class MachineLearningRepository : IMachineLearningRepository
{
    private readonly IMLModelClient _client;

    public MachineLearningRepository(IMLModelClient client)
    {
        _client = client;
    }

    public async Task<string> GetAnswer(string question)
    {
        return await _client.GetAnswerAsync(question);
    }
}
