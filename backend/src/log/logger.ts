import { toJalaali } from "jalaali-js";
import { createLogger, format, transports } from "winston";

const jalaaliFormat = (componentName: any) => {
  return format.printf(({ timestamp, level, message, ...meta }) => {
    const date = new Date(timestamp as string | number);
    const { jy, jm, jd } = toJalaali(date);
    const jalaaliDate = `${jy}/${jm}/${jd}`;
    const formattedMessage =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;
    return `${jalaaliDate} [${level}] [${componentName}]: ${formattedMessage}`;
  });
};

const logger = (componentName: any) =>
  createLogger({
    format: format.combine(
      format.timestamp(),
      format?.label({ label: "this is the label" }),
      format.prettyPrint(),
      // jalaaliFormat(componentName)
    ),
    transports: [
      new transports.Console({ level: "warn" }),
      new transports.File({
        filename: "error.log",
        level: "error",
        format: format.json(),
      }),
      new transports.File({ filename: "combined.log" }),
      new transports.Http({ level: "warn" }),
    ],
  });

const userProfileLogger = logger("UserProfile");

userProfileLogger.info("User profile loaded successfully.");
userProfileLogger.warn("User profile is not complete.", { field: "address" });
userProfileLogger.error({ error: "Failed to load user data", code: 404 });
userProfileLogger.info(["User A", "User B", "User C"]);

export default userProfileLogger;
