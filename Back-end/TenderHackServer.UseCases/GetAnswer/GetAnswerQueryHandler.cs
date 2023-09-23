using MediatR;
using Microsoft.Extensions.ML;
using TenderHack.Core;

namespace TenderHackServer.UseCases.GetAnswer;

public class GetAnswerQueryHandler : IRequestHandler<GetAnswerQuery, string>
{
    private readonly PredictionEnginePool<string, ModelOutput> _predictionEnginePool;

    public GetAnswerQueryHandler(PredictionEnginePool<string, ModelOutput> predictionEnginePool)
    {
        _predictionEnginePool = predictionEnginePool;
    }

    public async Task<string> Handle(GetAnswerQuery request, CancellationToken cancellationToken)
    {
        var result = _predictionEnginePool.Predict(modelName: "SentimentAnalysisModel", request.Question);
        return result.Answers.First();
    }
}
