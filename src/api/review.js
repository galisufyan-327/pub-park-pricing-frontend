import { api } from ".";
import { errorNotify } from "../components/common/notification/NotificationToast";
import { spotsEndpoint } from "./routes/spots";

const getError = (error) => {
  if (error?.response) {
    return { message: "Error", description: error?.response?.data?.errors ?? "Server Error" }
  }
  return { message: error?.name, description: error?.message }
}

export const addReview = async (id, data) => {
  try {
    return await api.post(`${spotsEndpoint}/${id}/reviews`, data);
  } catch (error) {
    errorNotify(getError(error));
    return error;
  }
}

export const updateReview = async (spotId, reviewId, data) => {
  try {
    return await api.put(`${spotsEndpoint}/${spotId}/reviews/${reviewId}`, data);
  } catch (error) {
    errorNotify(getError(error));
    return error;
  }
}