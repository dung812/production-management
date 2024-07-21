export class InterceptorConstant {

  public static readonly ERROR_OCURRED = 'An error ocurred. Please try again later.';

  public static readonly ERROR_NAME = 'Error name: ';

  public static readonly ERROR_MESSAGE = 'Error message: ';

  public static readonly HTTP_ERRORS = {
    401: 'You are not authorized to access this resource',
    403: 'You do not have permission to access this resource',
    404: 'Resource not found',
    500: 'Your request could not be processed at this time. Please try again later.'
  };

  public static readonly ERROR_BACKEND_MESSAGE = {
    'entity_not_found': 'The data you are looking for does not exist',
  };
}
