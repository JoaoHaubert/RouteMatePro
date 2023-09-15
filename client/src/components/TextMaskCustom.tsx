import MaskedInput from "react-text-mask";

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <TextMask
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
    />
  );
};
