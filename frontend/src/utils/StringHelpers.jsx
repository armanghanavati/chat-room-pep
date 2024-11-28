import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

export default class StringHelpers {
  static convertNumbersToLatin(input) {
    if (!input) {
      return;
    }
    return input
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9")
      .replace(/٠/g, "0")
      .replace(/١/g, "1")
      .replace(/٢/g, "2")
      .replace(/٣/g, "3")
      .replace(/٤/g, "4")
      .replace(/٥/g, "5")
      .replace(/٦/g, "6")
      .replace(/٧/g, "7")
      .replace(/٨/g, "8")
      .replace(/٩/g, "9");
  }
  static formatNumber(value) {
    return value && value != 0
      ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0";
  }
  static isNullOrWhitespace(input) {
    if (typeof input === "undefined" || input == null) return true;
    return input.replace(/\s/g, "").length < 1;
  }
  static unFormatMoney(separatedValue) {
    if (!!separatedValue) {
      return separatedValue.toString().replaceAll(",", "");
    } else {
      return separatedValue;
    }
  }
  static setComboBox(name, value, title, id) {
    return { [title]: name, [id]: value };
  }
  static fixErrorDesc(title) {
    // const fixTitle = title?.split("\n")
    if (!title?.includes("\\n\\r")) return title;
    const fixTitle = title?.split("\\n\\r");
    return fixTitle?.map((item) => (
      <div className="text-justify"> {item} </div>
    ));
  }
  static convertDateEn(date) {
    // const getDate = new DateObject();
    const fixDate = new DateObject(new Date(date));
    return fixDate?.format("YYYY-MM-DDTHH:mm:ss.SSS");
  }
  static convertDateEnForPrint(date) {
    // const getDate = new DateObject();
    const fixDate = new DateObject(new Date(date));
    return fixDate?.format("YYYY-MM-DD");
  }
  static convertDateEnWithoutTime(date) {
    // const getDate = new DateObject();
    const fixDate = new DateObject(new Date(date));
    return fixDate?.format("YYYY-MM-DD");
  }
  static convertJalaliDateToGregorian = (date) => {
    const fixDate = new DateObject(new Date(date));
    if (date) {
      const temp = moment
        .from(
          `${fixDate?.year}/${fixDate?.month}/${fixDate?.day}`,
          "fa",
          "YYYY/MM/DD"
        )
        .format("YYYY-MM-DDTHH:mm:ss.SSS");
      return temp;
    } else {
      return undefined;
    }
  };
  static fixComboListId(field, data) {
    const findZeroId = data?.some((item) => {
      return item?.id === 0;
    });
    if (findZeroId) {
      return data?.map((item) => item?.id);
    } else {
      return field?.map((item) => item?.id);
    }
  }
  static fixComboId(field, list) {
    console.log(field, list);
    if (field === 0) {
      return list?.map((item) => item?.id);
    } else {
      return field;
    }
  }
  static sliderThree = (value) => {
    console.log(value);
    if (value === 0) {
      return true;
    }
    if (value === 50) {
      return null;
    }
    if (value === 100) {
      return false;
    }
  };
  static generateId = (size) => {
    let result = [];
    let hexRef = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join("");
  };
  static convertToPersian = (data) => {
    const fixIt = new DateObject(new Date(data))
      .convert(persian, persian_fa)
      .format("HH:mm");
    return fixIt;
  };
}
