import {
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common'

export const HttpNotFound = (message = '') => {
  throw new NotFoundException(message || 'The item was not found.')
}

export const HttpUnprocessableEntity = (message = '') => {
  throw new UnprocessableEntityException(message)
}

export const HttpBadRequest = (message = '') => {
  throw new BadRequestException(message)
}
