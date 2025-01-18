import toast from "react-hot-toast";

//SHOW SUCCESS MSG MEHTOD
export function successMsg(msg) {
  toast.success(msg);
}

//SHOW DANGER MSG MEHOD
export function dangerMsg(msg) {
  toast.error(msg);
}

//STORE DATA IN LOCAL STORAGE
export function storeData(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
    console.log("Data saved to localStorage");
  } catch (error) {
    console.error("Error storing data in localStorage", error);
  }
}

//GET DATA FROM LOCAL STOGAGE
export function getData(key) {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data from localStorage", error);
    return null;
  }
}
