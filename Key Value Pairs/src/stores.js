import { writable } from 'svelte/store';

// color scale used in both visualizations
const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

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
    },
    {
        name: 'Bananas',
        value: 5,
    },
];

// function to sort the input array and add a color according to the sorted values
function formatInput(input) {
    return input
        .sort((a, b) => a.value < b.value ? 1 : -1)
        .map(({name, value}, index) => ({
            name,
            value,
            color: colorScale(index)
        }));
}

// create a custom store fulfilling the CRUD operations
function createItems(initialItems) {
    const { subscribe, update } = writable(initialItems);

    return {
        subscribe,
        // create: add an object for the item at the end of the store's array
        create: (name, value) => update(n => {
            n = [...n, {
                name, value
            }];
            return formatInput(n);
        }),
        // update: increase the value of the selected item
        update: (name, value) => update(n => {
            const index = n.findIndex(item => item.name === name);
            n[index].value += value;
            return formatInput(n);
        }),
        // delete: remove the item from the array
        delete: (name) => update(n => {
            const index = n.findIndex(item => item.name === name);
            n = [...n.slice(0, index), ...n.slice(index + 1)];
            return formatInput(n);
        })
    }
}

export const items = createItems(formatInput(data));