import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//to make notifactio to any componentet
export const notify = (msg, type) => {
  if (type === "warn") toast.warn(msg, { autoClose: 3000 });
  else if (type === "success") toast.success(msg, { autoClose: 3000 });
  else if (type === "error") toast.error(msg, { autoClose: 3000 });
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
