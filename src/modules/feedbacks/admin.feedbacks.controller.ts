import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FeedbacksService } from 'src/modules/feedbacks/feedbacks.service'
import { FeedbackQueryDto } from 'src/modules/feedbacks/dto/feedback-query.dto'
import { UpdateStatusDto } from 'modules/feedbacks/dto/update-feedback.dto'

@ApiBearerAuth()
@ApiTags('Feedbacks')
@Controller('admin/feedbacks')
export class AdminFeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @ApiOperation({ summary: 'Admin - Get list feedback' })
  @Get()
  async findAll(@Query() query: FeedbackQueryDto) {
    return await this.feedbacksService.findManyByAdmin(query)
  }

  @ApiOperation({ summary: 'Admin - Get one feedback by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne({ id })
  }

  @ApiOperation({ summary: "Admin - Update feedback's status" })
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.feedbacksService.update(id, updateStatusDto)
  }

  @ApiOperation({ summary: 'Admin - Delete a feedback' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feedbacksService.removeFeedback(id)
  }
}
