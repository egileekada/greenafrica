import Header from "layouts/Base/partials/Header";
import Footer from "layouts/Base/partials/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showWidget } from "redux/reducers/general";
import { startSession } from "redux/reducers/session";

// ?origin=ABV&destination=LOS&departure=2022-08-18&adt=1&chd=0&inf=0

const BaseLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    async function checkParams() {
      const ibeQuery = new URLSearchParams(window.location.search);
      const flightOrigin = ibeQuery.get("origin");
      console.log("IBE QUERY", ibeQuery);

      if (flightOrigin) {
        // Extract Details, clear adrres bar, and start an ibe session
        dispatch(startSession());
      } else {
        dispatch(showWidget());
      }


      // if (userToken) {
      //   const decodedToken = decodeToken(userToken);
      //   const isMyTokenExpired = isExpired(userToken);
      //   const roleId = decodedToken.roles[0].UserRoles.roleId;

      //   if (!isMyTokenExpired && decodeToken) {
      //     localStorage.setItem("ptp-token", userToken);
      //     localStorage.setItem("ptp-user", JSON.stringify({ ...decodedToken }));
      //     localStorage.setItem("ptp-role", parseInt(roleId));
      //   }
      // }
    }
    checkParams();
  }, []);

  // useEffect(() => {
  //   async function checkAuth() {
  //     const user = JSON.parse(localStorage.getItem("ptp-user"));
  //     const token = localStorage.getItem("ptp-token");
  //     const role = parseInt(localStorage.getItem("ptp-role"));

  //     if (!user || !token) {
  //       router.push("/auth/login");
  //     } else {
  //       if (role !== 2) {
  //         router.push(roleToRoute(role));
  //       }
  //     }
  //   }

  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   loadUser();
  // }, []);

  return (
    <>
      <section className="w-full bg-white relative">
        <Header />
        {children}
        <Footer />
      </section>
    </>
  );
};

BaseLayout.getInitialProps = async (ctx) => {
  return {
    path: "",
  };
};

export default BaseLayout;
