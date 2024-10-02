import { Box } from "../../../components/elements";
import { Flex } from "../../../components/Flex/Flex";
import InputField from "../../../components/InputFeild/InputFeild";
import { HeadingCss } from "../../../styles/style";
import { Divder } from "../../Marketplace/Marketplace";

const PersonalDetails = () => {
  return (
    <>
      <Divder />
      <Box as="h1" css={HeadingCss}>
        PersonalDetails
      </Box>
      <Flex direction={"row"} css={{ gap: "24px" }}>
        <InputField label="Name" value="John Doe" />
        <InputField label="Name" value="John Doe" />
      </Flex>
    </>
  );
};

export default PersonalDetails;
