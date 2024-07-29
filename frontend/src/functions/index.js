import { toast } from "react-toastify";

//to make notifactio to any componentet
export const notify = (msg, type) => {
  if (type === "warn") toast.warn(msg);
  else if (type === "success") toast.success(msg);
  else if (type === "error") toast.error(msg);
};

// to convert base 64 to file
export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const getSortType = (sortType) => {
  switch (sortType) {
    case "الاكثر مبيعا":
      return "-sold";
    case "الاعلي تقييما":
      return "-quantity";
    case "السعر من الاقل للاعلي":
      return "+price";
    case "السعر من الاعلي للاقل":
      return "-price";
    default:
      return "";
  }
};
