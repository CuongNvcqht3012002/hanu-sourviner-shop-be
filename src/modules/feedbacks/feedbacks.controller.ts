import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateFeedbackDto } from 'modules/feedbacks/dto/create-feedback.dto'
import { FeedbacksService } from 'src/modules/feedbacks/feedbacks.service'

@ApiBearerAuth()
@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @ApiOperation({ summary: 'User - Create a new feedback' })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.createByUser(createFeedbackDto)
  }
}
