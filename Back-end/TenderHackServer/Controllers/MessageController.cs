using MediatR;
using Microsoft.AspNetCore.Mvc;
using TenderHackServer.UseCases.GetMessages;

namespace TenderHackServer.Controllers;

[Route("api/messages/[action]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly IMediator _mediator;

    public MessageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        var result = await _mediator.Send(new GetMessagesQuery(userId: 0));
        return Ok(result);
    }
}
