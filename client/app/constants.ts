// function isString(value): asserts value is string {
//   if (typeof value !== "string") throw new Error("value is not string");
// }

// isString(process.env.SPOTIFY_CLIENT_ID);
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

console.log(process.env.SPOTIFY_CLIENT_ID);
