// import { FormEvent } from "react";
// import { useActor } from "../ic/Actors";
// import { useAuthType } from '../components/auth/authguard';
// import { toast } from "react-toastify";

// export const saveUser = () => {
//   const { actor } = useActor();
//   const authType = useAuthType(); // Memanggil hook untuk jenis otentikasi

//   const saveProfile = async (
//     profileData: {
//       name: string;
//       avatarUrl: string;
//       banner_url: string;
//       bio: string;
//       link_user: string;
//       facebook: string;
//       twitter: string;
//       youtube: string;
//       linkedin: string;
//       instagram: string;
//     },
//     onSuccess: (name: string) => void,
//     onError: (error: string) => void
//   ) => {
//     const { name, avatarUrl, banner_url, bio, link_user, facebook, twitter, youtube, linkedin, instagram } = profileData;
  
//     try {

//       // if (!name) {
//       //   throw new Error("Nama pengguna tidak boleh kosong.");
//       // }
  
//       if (!actor) {
//         toast.error("Anda belum login.");
//         return;
//       }
  
//       // Panggil fungsi untuk menyimpan profil menggunakan `actor`.
//       //console.log(name, avatarUrl, banner_url, bio, facebook, twitter, youtube, linkedin, instagram, link_user);
  
//       const authtypes = authType || "ICP"; 
//       const link = link_user; 
//       const response = await actor.save_my_profile(name, avatarUrl, banner_url, authtypes, link, bio, facebook, twitter, youtube, linkedin, instagram);

//       if ("Ok" in response) {
//         // console.log("Profile saved successfully:", response.Ok);
//         // Tampilkan data profile yang disimpan
//         // console.log("Saved Profile:", {
//         //   name: name_user,
//         //   avatarUrl,
//         //   authtypes,
//         //   link,
//         // });

//         console.log(response)

//         toast.success("Profile saved successfully!");

//         setTimeout(() => {
//           window.location.reload();
//         }, 1000); 
        
//       } else {
//         toast.error("Harap isi bidang nama atau avatar url");
//         //console.error("Error saving profile:", response.Err);
//       }

//       onSuccess(name);
//     } catch (err) {
//       console.error("Gagal menyimpan profil:", err);
//       onError(err instanceof Error ? err.message : "Kesalahan tidak diketahui.");
//     }
//   };
  

//   const getUsername = async (): Promise<string | null> => {
//     try {
//       // Simulasi pengambilan username
//       console.log("Fetching username...");
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
