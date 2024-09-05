import { writable } from 'svelte/store';

const gradingStatus = writable(null);
const gradedSub = writable(null);


export { gradingStatus, gradedSub };
