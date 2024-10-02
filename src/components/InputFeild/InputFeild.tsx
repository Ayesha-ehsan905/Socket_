import { styled } from "../../styles";

const InputWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
  flex: "1",
});

const StyledLabel = styled("label", {
  marginBottom: ".5rem",
  fontSize: "12px",
  color: "$primary",
  fontWeight: "$normal",
  paddingLeft: "12px",
});

const StyledInput = styled("input", {
  fontSize: "$14px",
  fontWeight: "$normal",
  color: "$primary",
  outline: "none",
  border: "none",
  background: "$white1",
  paddingLeft: "12px",
  width: "100%",
  fontFamily: "$Baloo",
});

const InputCard = styled("div", {
  padding: "17px 12px 17px 0",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  border: "1px solid $grey2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Component with dynamic props
interface InputFieldProps {
  label: string;
  value: string;
  setValue?: (value: string) => void;
  placeholder?: string;
}

const InputField = ({
  label,
  value,
  setValue,
  placeholder,
}: InputFieldProps) => {
  return (
    <InputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <InputCard>
        <StyledInput
          id={label}
          value={value}
          placeholder={placeholder ?? ""}
          readOnly={!setValue}
          onChange={(e) => setValue?.(e.target.value)}
        />
      </InputCard>
    </InputWrapper>
  );
};

export default InputField;
