import { writable } from 'svelte/store';

export const url = "https://cogentia.theportman.co/api";

export function fetchOptions(query) {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    }
}

export const homepageData = writable([]);
export const servicesData = writable([]);