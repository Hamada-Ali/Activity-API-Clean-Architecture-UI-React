using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity;
        }

        // fluent validation ( Application Layer )
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly MyContext _context;
            private readonly IMapper _mapper;

            public Handler(MyContext context, IMapper mapper) {

                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null; 

                //activity.Title = request.Activity.Title;
                _mapper.Map(request.Activity, activity);

                var saveActivity = await _context.SaveChangesAsync() > 0;

                if (!saveActivity) return Result<Unit>.Failer("The Activity Didn't Edited");

                return  Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
