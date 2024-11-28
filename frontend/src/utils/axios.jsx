import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json; charset=utf-8";

    if (sessionStorage.getItem("token") !== "") {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    // const rowMsgMod = response?.data?.message?.split("//");
    // const allRowMsgMod = rowMsgMod?.map((item) => (
    //   <ul className="px-4 py-2">
    //     <li className=""> {item} </li>
    //   </ul>
    // ));

    if (
      !!response?.data?.code &&
      response?.data?.code !== 0 &&
      response?.data?.code !== 2 &&
      response?.data?.code !== 5 &&
      response?.data?.code !== 10 &&
      response?.data?.code !== 11
    ) {
      // store.dispatch(
      //   RsetMessageModal({
      //     show: true,
      //     title: allRowMsgMod || "مشکلی در سرور به وجود آمده است.",
      //   })
      // );
    }
    return response;
  },
  function (error) {
    try {
      const expectedErrors =
        error?.response &&
        error?.response?.status !== 401 &&
        error?.response?.status >= 400 &&
        error?.response?.status < 500;
      if (expectedErrors) {
        // store.dispatch(
        //   RsetShowToast({
        //     isToastVisible: true,
        //     Message: "مشکلی در سرور به وجود آمده است",
        //     Type: "Unsuccess",
        //   })
        // );
        alert("مشکلی در سرور به وجود آمده است");
        return;
      }
    } catch (error) {
      const { message } = error;
      //   store.dispatch(
      //     RsetMessageModal({
      //       show: true,
      //       title:
      //         error.response.data.message || "مشکلی در سرور به وجود آمده است.",
      //     })
      //   );
      alert("مشکلی در سرور به وجود آمده است");
      return Promise.reject(message);
    }
  }
);
//   async function (error) {
//     const expectedErrors = error.response && error.response.status !== 401 && error.response.status >= 400 && error.response.status < 500
//     if (expectedErrors) {
//       setTimeout(() => {
//         window.location = "/login";
//         localStorage.clear();
//       }, 2000);
//       store.dispatch(
//         RsetMessageModal({
//           show: true,
//           title:
//             error.response.data.message || "مشکلی در سرور به وجود آمده است.",
//         })
//       );
//       return error;
//     } else {
//       localStorage.clear();
//       return error;
//     }
//   }
// );
