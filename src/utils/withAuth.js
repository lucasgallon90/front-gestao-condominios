import React, { ElementType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
// import { api } from "../services/util";

export default function withAuth(WrappedComponent) {
  const Wrapper = (props) => {
    const router = useRouter();
    const token = Cookie.get("token");
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser ]= useState(null);

    useEffect(async () => {
        setIsLogged(true);
    //   const token = Cookie.get("token");
    //   const resposta = await api
    //     .get(`admin/usuarios/logado`, {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       if (response.status == 200) {
    //         if (response.data.length === 0) {
    //           router.replace("/login");
    //         } else {
    //           setIsLogged(true);
    //         }
    //       } else{
    //         router.replace("/login");
    //       }
    //     })
    //     .catch((error) => {
    //       router.replace("/login");
    //     });
    },[]);
    if (isLogged) {
      return <WrappedComponent  {...props} />;
    } else {
       return [];
    }
  };
  return Wrapper;
}