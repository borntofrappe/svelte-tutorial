import { writable } from 'svelte/store';
// in the store describes a list of items by name and value

const data = [
    {
        name: 'Apples',
        value: 10,
    },
    {
        name: 'Grapes',
        value: 18,
    },
    {
        name: 'Peaches',
        value: 15,
    }
];

function createItems() {
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        create: (name, value) => update(n => [...n, {
            name, value
        }]),
        update: (name, value) => update(n => {
            const index = n.findIndex(item => item.name === name);
            n[index].value += value;
            return n;
        }),
        delete: (name) => update(n => {
            const index = n.findIndex(item => item.name === name);
            return [...n.slice(0, index), ...n.slice(index + 1)];
        })
    }
}


export const items = createItems();