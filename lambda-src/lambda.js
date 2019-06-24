class Response {
  constructor(response, headers) {
    this.response = response;
    this.headers = headers;
    this.s = 200;
  }

  status(val) {
    this.s = val;
    return this;
  }

  send(data) {
    this.response(null, { body: data, statusCode: this.s, headers: this.headers });
  }
}

class lambda {
  constructor(event, context, callback, options) {
    this.context = context;
    this.event = event;
    this.statusCode = 200;
    this.response = callback;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    this.context.callbackWaitsForEmptyEventLoop = options.callbackWaitsForEmptyEventLoop || true;
  }

  post(validation, handler) {
    if (this.event.httpMethod === 'POST') {
      const body = JSON.parse(this.event.body);
      if (Object.entries(validation).find(el => typeof body[el[0]] !== 'string')) {
        this.response({
          statusCode: 400,
          headers: this.headers,
          body: 'input body is invalid',
        });
      }
      handler(body, new Response(this.response, this.headers));
    }
  }
}

export default lambda;
