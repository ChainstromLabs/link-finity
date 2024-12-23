// import { FormEvent, useEffect } from "react";

// import { useActor } from "../ic/Actors";
// import { useIsAuthenticated, useAuthType } from '../components/auth/authguard';
// import { toast } from "react-toastify";

// export const useProfileService = () => {

//   const { actor } = useActor();
//   const authType = useAuthType(); // Memanggil hook untuk jenis otentikasi


//   const saveProfile = async (
//     event: FormEvent<HTMLFormElement>,
//     name: string,
//     onSuccess: (username: string) => void,
//     onError: (error: string) => void
//   ) => {
//     event.preventDefault();

//     try {
   
//       if (!name) {
//         throw new Error("Username cannot be empty");
//       }

//       (async () => {
//         if (!actor) {
//          // console.error("Actor is not available");
//           toast.error("Anda belum login");
//           return;
//         }
      
//         const name_user = " ";
//         const avatarUrl = " "; 
//         const authtypes = authType || "ICP"; 
//         const link = name; 
      

//         const facebook = " ";
//         const twitter = " "; 
//         const youtube = " ";
//         const linkedin = " "; 
//         const instagram = " "; 
//         const bio = " "; 
//         const banner_url = " "; 
        
//         // Validasi awal parameter
//         if (!authtypes || !link) {
//           toast.error("Error Hubungi Linkfinity");
//           return;
//         }
      
//         try {

//           // Memanggil fungsi save_my_profile , facebook, twitter, youtube, linkedin, instagram
//           const response = await actor.save_my_profile(name_user, avatarUrl, banner_url, authtypes, link, bio, facebook, twitter, youtube, linkedin, instagram);

//           if ("Ok" in response) {
//             // console.log("Profile saved successfully:", response.Ok);
//             // Tampilkan data profile yang disimpan
//             // console.log("Saved Profile:", {
//             //   name: name_user,
//             //   avatarUrl,
//             //   authtypes,
//             //   link,
//             // });

//             toast.success("Profile saved successfully!");
//             setTimeout(() => {
//               window.location.reload();
//             }, 1000); 
            
//           } else {
//             toast.error("Name is already in use");
//             //console.error("Error saving profile:", response.Err);
//           }
//         } catch (error) {
//           console.error("Error during save_my_profile call:", error);
//         }
//       })();
      
//       // Simulasi sukses
//       // setTimeout(() => {
//       //   onSuccess(name); 
//       // }, 1000);
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       onError(err instanceof Error ? err.message : "Unknown error");
//     }
//   };



//   // (async () => {
//   //   if (!actor) return;

//   //   const response = await actor.getProfilesByLink("gaskeun");
//   //   if (response && "Ok") {
//   //     // setProfiles(response.Ok);
//   //     console.log(response);
//   //     // console.log(authType)

//   //   } else {
//   //     console.log("test2")
//   //   }

//   //   // setLoading(false);
//   // })();



//   const getUsername = async (): Promise<string | null> => {
//     try {
//       // // Simulasi pengambilan username
//       // console.log("Fetching username...");
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           const username = "fetched_username"; // Simulasi username yang diambil
//           console.log("Fetched username:", username);
//           resolve(username);
//         }, 1000);
//       });
//     } catch (err) {
//       console.error("Error fetching username:", err);
//       return null;
//     }
//   };

//   return {
//     saveProfile,
//     getUsername,
//   };
// };
