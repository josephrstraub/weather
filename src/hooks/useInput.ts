import { ChangeEvent, useState } from "react";

export default (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    inputProps: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
      onChangeText: (text: string) => {
        setValue(text);
      },
    }
  };
};
