import { toJalaali } from "jalaali-js";
import { createLogger, format, transports } from "winston";

const jalaaliFormat = () => {
  return format.printf(({ timestamp, level, message }) => {
    const date = new Date(timestamp as string | number);
    const { jy, jm, jd } = toJalaali(date);
    const jalaaliDate = `${jy}/${jm}/${jd}`;
    return `${jalaaliDate} [${level}]: ${message}`;
  });
};

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), jalaaliFormat()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
