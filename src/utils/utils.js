import moment from "moment";
import "moment/locale/id";

export const formatDate = (isoStringDate) => {
  return moment(isoStringDate).format("DD MMMM YYYY");
};
