using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Activity_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private  IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


        // we move this logic here for simplicity
        protected IActionResult HandleResult<T>(Result<T> result)
        {
            // used for edit
            if (result == null) return NotFound();

            if (result.isSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }

            if (result.isSuccess && result.Value == null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}
