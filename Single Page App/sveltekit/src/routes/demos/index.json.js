import { demos } from './_data.js';

export function get({query}) {
  if(query.has('id')) {
    const id = query.get('id');
    const demo = demos.find(d => d.id === parseInt(id, 10));
    console.log(id)

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
  return {
    body: {
      demos
    }
  }
}