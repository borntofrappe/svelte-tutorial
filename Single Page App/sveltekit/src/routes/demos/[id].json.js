import { demos } from './_data.js';

export function get({ params }) {
  const {id} = params;
  const demo = demos.find(d => d.id === parseInt(id, 10));

  if(demo) {
    return {
      status: 200,
      body: {
        demo
      },
    }
  }
  return {
    status: 404
  }
}