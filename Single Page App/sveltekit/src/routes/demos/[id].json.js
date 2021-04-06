import { demos } from './_data.js';

export function get(d) {
  console.log(d);
  const {id} = d.params;
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