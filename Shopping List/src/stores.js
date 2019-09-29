import { writable } from 'svelte/store';

// in the store describe a list of items by name and value
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

// create a custom store fulfilling the CRUD operations
function createItems() {
    const { subscribe, set, update } = writable(data);

    return {
        subscribe,
        // create: add an object for the item at the end of the store's array
        create: (name, value) => update(n => [...n, {
            name, value
        }]),
        // update: increase the value of the selected item
        update: (name, value) => update(n => {
            const index = n.findIndex(item => item.name === name);
            n[index].value += value;
            return n;
        }),
        // delete: remove the item from the array
        delete: (name) => update(n => {
            const index = n.findIndex(item => item.name === name);
            return [...n.slice(0, index), ...n.slice(index + 1)];
        })
    }
}

export const items = createItems();