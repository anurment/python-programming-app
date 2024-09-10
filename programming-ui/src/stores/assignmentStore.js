import { writable } from 'svelte/store';
import { readable } from "svelte/store";

let user = localStorage.getItem("userUuid");

if (!user) {
  user = crypto.randomUUID().toString();
  localStorage.setItem("userUuid", user);
} 

export const getPas = async () => {
    const response = await fetch(`/api/programming-assingment/user/${user}`);
        return await response.json();
};  

export const userUuid = readable(user);
export const code = writable('');
export const gradingStatus = writable(null);
export const gradedSub = writable(null);
export const pasPromise = writable(null);

  

