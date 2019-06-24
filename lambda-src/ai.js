
import Lambda from './lambda';
import loadModel from './models';


exports.handler = function handler(event, context, callback) {
  const app = new Lambda(event, context, callback, { callbackWaitsForEmptyEventLoop: false });


  app.post({ code: 'string', name: 'string' }, async (body, res) => {
    try {
      const { AI } = await loadModel();
      await new AI({ name: body.name, code: body.code }).save();
      return res.send({
        statusCode: 200,
        headers: app.headers,
        body: 'You saved your AI',
      });
    } catch (e) {
      return app.response(e.message);
    }
  });
};
