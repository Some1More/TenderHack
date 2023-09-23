namespace TenderHackServer.UseCases.Abstractions;

public interface IMachineLearningRepository
{
    Task<string> GetAnswer(string question);
}
