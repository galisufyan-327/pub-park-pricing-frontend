import { notification } from "antd"

export const errorNotify = ({ message, description }) => {
  notification.error({ message, description, duration: 8, placement: "topRight" })
}

export const successNotify = ({ message, description }) => {
  notification.success({ message, description, duration: 8, placement: "topRight" })
}