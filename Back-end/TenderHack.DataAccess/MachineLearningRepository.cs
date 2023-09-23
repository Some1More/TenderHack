using Microsoft.ML;
using TenderHackServer.UseCases.Abstractions;

namespace TenderHack.DataAccess;

public class MachineLearningRepository : IMachineLearningRepository
{
    private readonly MLContext _mlContext = new();

    public DataViewSchema GetModel()
    {
        DataViewSchema modelSchema;
        ITransformer trainedModel = _mlContext.Model.Load("model.zip", out modelSchema);
        return modelSchema;
    }
}
