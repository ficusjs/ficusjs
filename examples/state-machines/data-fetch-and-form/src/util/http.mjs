// @ts-nocheck
function createError (type, response) {
  const error = Error(type)
  error.response = response
  return error
}

function handleErrors (res) {
  if (res.ok) {
    return res
  }

  if (res.statusText !== '') {
    throw createError(res.statusText, res)
  }

  const requestErrors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Server Unavailable',
    504: 'Gateway Timeout'
  }

  const errorType = requestErrors[res.status]

  if (errorType) {
    throw createError(errorType, res)
  }

  throw res
}

function handleResponses (res) {
  if (res.status === 204) {
    return null
  }
  return res.json()
}

export function httpGet (url, headers) {
  return window
    .fetch(url, {
      method: 'GET',
      headers: headers
    })
    .then(handleErrors)
    .then(handleResponses)
}
