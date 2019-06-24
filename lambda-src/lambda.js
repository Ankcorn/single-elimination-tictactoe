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

  res() {
    return { send: data => this.response(null, data) };
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
      handler(body, this.res());
    }
  }
}

export default lambda;
