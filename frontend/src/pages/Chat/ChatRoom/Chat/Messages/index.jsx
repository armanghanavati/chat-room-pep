import React from "react";
import StringHelpers from "../../../../../utils";

const Messages = ({ messages, messagesEndRef }) => {
  const numberUserId = 1;

  return (
    <>
      {messages?.map((msg, index) => {
        const numberServerUserId = Number(msg?.userId);
        return (
          <div
            ref={messagesEndRef}
            key={index}
            className={`d-flex w-100 align-items-center justify-content-${
              numberUserId === numberServerUserId ? "start" : "end"
            }`}
          >
            {numberUserId === numberServerUserId && (
              <span className="text-secondary fw-bold mx-1">
                {msg?.userName}
              </span>
            )}
            {numberUserId === numberServerUserId && (
              <div
                className="rounded-5 my-2 p-3"
                style={{
                  backgroundColor:
                    numberUserId === numberServerUserId
                      ? "Lavender"
                      : "lightblue",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <div className="d-flex justify-content-between">
                  <span className="ms-2">{msg?.title}</span>
                </div>
              </div>
            )}
            {numberUserId === numberServerUserId && (
              <span className="text-secondary fw-light font13 mx-2">
                {msg?.time?.includes("T")
                  ? StringHelpers?.convertToPersian(msg?.time)
                  : msg?.time}
              </span>
            )}
            {numberUserId !== numberServerUserId && (
              <span className="text-secondary fw-light font13 mx-2">
                {msg?.time?.includes("T")
                  ? StringHelpers?.convertToPersian(msg?.time)
                  : msg?.time}
              </span>
            )}
            {numberUserId !== numberServerUserId && (
              <div
                className="rounded-5 my-2 p-3"
                style={{
                  backgroundColor:
                    numberUserId === numberServerUserId
                      ? "Lavender"
                      : "lightblue",
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <div className="d-flex justify-content-between">
                  <span className="ms-2">{msg?.title}</span>
                </div>
              </div>
            )}
            {numberUserId !== numberServerUserId && (
              <span className="fw-bold text-secondary mx-1">
                {msg?.userName}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Messages;

// import React from "react";

// const Messages = ({ messages, messagesEndRef }) => {
//   const { userId } = useSelector((state) => state.users) || {};
//   const numberUserId = Number(userId);

//   return (
//     <>
//       {messages?.map((msg, index) => {
//         const numberServerUserId = Number(msg?.userId);
//         const isCurrentUser = numberUserId === numberServerUserId;
//         const userTime = msg?.time?.includes("T")
//           ? StringHelpers?.convertToPersian(msg?.time)
//           : msg?.time;

//         return (
//           <div
//             ref={messagesEndRef}
//             key={index}
//             className={`d-flex w-100 align-items-center justify-content-${isCurrentUser ? "start" : "end"}`}
//           >
//             {isCurrentUser && (
//               <>
//                 <span className="text-secondary fw-bold mx-1">{msg?.userName}</span>
//                 <div className="rounded-5 my-2 p-3" style={{ backgroundColor: "Lavender", maxWidth: "50%", wordWrap: "break-word" }}>
//                   <span className="ms-2">{msg?.title}</span>
//                 </div>
//               </>
//             )}
//             {!isCurrentUser && (
//               <>
//                 <div className="rounded-5 my-2 p-3" style={{ backgroundColor: "lightblue", maxWidth: "50%", wordWrap: "break-word" }}>
//                   <span className="ms-2">{msg?.title}</span>
//                 </div>
//                 <span className="fw-bold text-secondary mx-1">{msg?.userName}</span>
//               </>
//             )}
//             <span className={`text-secondary fw-light font13 ${isCurrentUser ? "ms-2" : "me-2"}`}>{userTime}</span>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default Messages;