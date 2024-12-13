// import { CreateGift, PaginationData } from "@/types/Gift";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const takeGift = async (name: string, selectedGiftId: number | null) => {
//   const url = `${BACKEND_URL}/gifts/${selectedGiftId}/buy`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       buyer: name,
//       buyerEmail: "any@gmail.com",
//       buyerMessage: "parabens!",
//     }),
//   });

//   return response;
// };

// export const createGift = async (newGift: CreateGift) => {
//   const url = `${BACKEND_URL}/gifts`;
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newGift),
//   });

//   return response;
// };

// export const fetchGifts = async (currentPage: number) => {
//   const url = `${BACKEND_URL}/gifts/paginated?page=${currentPage}&size=7`;
//   const response = await fetch(url);

//   if (response.ok) {
//     return (await response.json()) as PaginationData;
//   } else {
//     throw new Error("Failed to fetch data");
//   }
// };

// export const getGifts = async (params?: string) => {
//   const url = `${BACKEND_URL}/gifts`;
//   const response = await fetch(url, {
//     method: "GET",
//   });

//   return await response;
// };

// export const listBoughtGifts = async () => {
//   const url = `${BACKEND_URL}/gifts?bought=true`;
//   const response = await fetch(url, {
//     method: "GET",
//   });

//   return await response;
// };

// export const countGifts = async () => {
//   const url = `${BACKEND_URL}/gifts/count`;
//   const response = await fetch(url, {
//     method: "GET",
//   });

//   return await response;
// };

// export const countNotBoughtGifts = async () => {
//   const url = `${BACKEND_URL}/gifts/countAvailable`;
//   const response = await fetch(url, {
//     method: "GET",
//   });

//   return await response;
// };
