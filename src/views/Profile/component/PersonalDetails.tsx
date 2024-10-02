import { Box } from "../../../components/elements";
import { Flex } from "../../../components/Flex/Flex";
import InputField from "../../../components/InputFeild/InputFeild";
import { HeadingCss } from "../../../styles/style";
import { Divder } from "../../Marketplace/Marketplace";

interface IPersonalDetails {
  first_name: string;
  last_name: string;
}

const PersonalDetails = ({ first_name, last_name }: IPersonalDetails) => {
  return (
    <>
      <Divder />
      <Box as="h1" css={HeadingCss}>
        PersonalDetails
      </Box>
      <Flex direction={"row"} css={{ gap: "24px" }}>
        <InputField label="First Name" value={first_name} />
        <InputField label="Last Name" value={last_name} />
      </Flex>
    </>
  );
};

export default PersonalDetails;
