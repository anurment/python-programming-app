import { writable } from 'svelte/store';

const code = writable('');
const programmingAssignment = writable(null);



export { code, programmingAssignment };