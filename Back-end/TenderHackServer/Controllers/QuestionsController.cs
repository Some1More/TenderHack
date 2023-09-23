using MediatR;
using Microsoft.AspNetCore.Mvc;
using TenderHackServer.UseCases.GetAnswer;

namespace TenderHackServer.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionsController : ControllerBase
{
    private IMediator _mediator;

    public QuestionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("answer")]
    public async Task<IActionResult> GetAnswer([FromQuery] string question)
    {
        var result = await _mediator.Send(new GetAnswerQuery(question));
        return Ok(result);
    }
}
