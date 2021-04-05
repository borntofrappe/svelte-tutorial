import { demos } from './_data.js';

export function get(req, res, next) {
  const {id} = req.params;
  const demo = demos.find(d => d.id === parseInt(id, 10));

  if(demo) {
    res.setHeader('Content-Type', 'applications/json');
    res.end(JSON.stringify(demo))
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Demo not found'}));
  }
}