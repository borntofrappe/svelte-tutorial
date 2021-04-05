import { demos } from './_data.js';

export function get(req, res, next) {
  res.end(JSON.stringify(demos));
}

export function post(req, res, next) {
  const { title, description, details, href } = req.body;
  demos.push({title, description, details, href, id: demos.length});
}