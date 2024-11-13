import React from "react";

const Messages = ({ messages, messagesEndRef }) => {
  return (
    <>
      {messages?.map((msg, index) => {
        return (
          <div
            ref={messagesEndRef}
            key={index}
            className={`d-flex w-100 align-items-center justify-content-${
              msg.from === "me" ? "start" : "end"
            }`}
          >
            {msg.from === "me" && (
              <span className="text-secondary mx-1">{msg?.userId}</span>
            )}
            <div
              className="rounded-5 my-2 p-3"
              style={{
                backgroundColor: msg.from === "me" ? "Lavender" : "lightblue",
                maxWidth: "50%",
                wordWrap: "break-word",
              }}
            >
              <div className="d-flex justify-content-between">
                <span className="ms-2">{msg?.title}</span>
                <span className="text-secondary fw-light font15 ms-2">
                  {msg?.time}
                </span>
              </div>
            </div>
            {msg.from !== "me" && (
              <span className="text-secondary mx-1">{msg?.userId}</span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Messages;
