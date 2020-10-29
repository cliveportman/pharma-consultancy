import { writable } from 'svelte/store';

const query = `
  query GetPages {
    pages {
      slug
      copy {
        html
      }
      bgColor {
        hex
      }
    }
  }
`;

export const url = "https://api-eu-central-1.graphcms.com/v2/ckd50bjue0j3d01z0ghja3vqe/master";

export const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};

export const pageList = writable([]);