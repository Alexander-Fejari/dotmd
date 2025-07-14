// "use client";

// import { useEffect } from "react";

// export const usePostLoginEffect = () => {
//   useEffect(() => {
//     const prepareStep = async () => {
//       setIsLoadingAction(true);
//       try {
//         const res = await fetch("/api/auth/post-signup", {
//           method: "POST"
//         });
//         if (!res.ok) {
//           throw new Error(`Erreur lors de l'initialisation du post login: ${res.statusText}`);
//         }
//       } 
//       catch (error) {
//         console.error("Erreur init Git step:", error)
//         throw new Error(`Erreur lors de l'initialisation du post login: ${error.message}`);
//       } 
//       finally {
//           setIsLoadingAction(false);
//         }

//         prepareStep()
//     }, []);
// };