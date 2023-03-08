const convertToFormData = (data) => {
  const Form = new FormData();

  const isObject = (key, obj) => {
    for (const object in obj) {
      if (Array.isArray(obj)) {
        Object.entries(obj[Number(object)]).forEach((item) => {
          Form.append(`${key}[${object}][${item[0]}]`, item[1]);
        });
      }
      else Form.append(`${key}[${object}]`, obj[object]);
    }
  };

  const appendFiletoForm = (key, value) => {
    [].map.call(value, (item) => {
      (value.length > 1) ? Form.append(`${key}[]`, item) : Form.append(`${key}`, item)
    }
    );
  }

  const fileIsPresent = (payloadKey) => ["spot[images]"].includes(payloadKey)

  Object.entries(data).forEach((ele) => {
    const [elementKey, elementValue] = ele;
    if ((elementKey === "logo") && elementValue?.length > 0) {
      appendFiletoForm(elementKey, elementValue);
    } else if (Array.isArray(elementValue)) {
      elementValue.forEach((item) => {
        if (typeof item === "object" && !item?.arrayBuffer) {
          for (const key in item) {
            Form.append(`${elementKey}[]${key}`, item[key]);
          }
        }
        return Form.append(`${elementKey}[]`, item);
      });
    } else if (typeof elementValue === "object" && !ele?.[1]?.arrayBuffer) {
      for (const key in data[elementKey]) {
        if (fileIsPresent(`${elementKey}[${key}]`)) {
          appendFiletoForm(`${elementKey}[${key}]`, data[elementKey][key])
        }
        else if (typeof data[elementKey][key] === "object") {
          isObject(`${elementKey}[${key}]`, data[elementKey][key]);
        } else {
          Form.append(`${elementKey}[${key}]`, data[elementKey][key]);
        }
      }
    } else {
      Form.append(elementKey, elementValue ?? "");
    }
  });
  return Form;
};

export { convertToFormData };