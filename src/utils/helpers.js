import {format, formatDistance} from "date-fns";
import fr from "date-fns/locale/fr";
import {axiosClient} from "./axios";


export const truncateText = (inputText, maxLength) => {
  return inputText && inputText.length > maxLength ? inputText.substr(0, maxLength) + "..." : inputText;
};

export const formatDate = (inputDate) => {
  if (!inputDate) return null;
  const date = new Date(inputDate);
  return format(date, "dd/MM/yyyy");
};
export const formatedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateAndHour = (inputDate) => {
  const date = new Date(inputDate);
  return format(date, "dd MMMM yyyy à HH:mm", { locale: fr });
};

export const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post("/upload/public", formData, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data.file_url;
};

export const formatedDateAndHour = (dateString) => {
  return format(new Date(dateString), "dd MMM yyyy 'à' hh:mm", { locale: fr });
};

// Cette fonction calcule le nombre de jours entre deux dates
export const getNumberOfDays = (resDateString, subDateString) => {
  const resDate = new Date(resDateString);
  const subDate = new Date(subDateString);
  return formatDistance(resDate, subDate, { locale: fr });
};

export const generateRandomString = (length) => {
  return Math.random().toString(20).substring(2, length);
};

// Cette fonction récupère les détails d'un fichier à partir de l'URL du fichier
export const getFileDetails = (fileUrl) => {
  const lastSlashIndex = fileUrl.lastIndexOf("/");
  const fileWithExtension = fileUrl.substring(lastSlashIndex + 1);
  const dotIndex = fileWithExtension.lastIndexOf(".");

  const name = decodeURI(fileWithExtension.substring(0, dotIndex));
  const type = fileWithExtension.substring(dotIndex + 1);
  return { name, type, url: fileUrl };
};
