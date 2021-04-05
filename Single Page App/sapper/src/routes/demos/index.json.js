import { demos } from './_data.js';

export function get(req, res, next) {
  res.end(JSON.stringify(demos));
}