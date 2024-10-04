import APILoader from "../../../components/ApiLoader";
import { Box } from "../../../components/elements";
import { Flex } from "../../../components/Flex/Flex";
import InputField from "../../../components/InputFeild/InputFeild";
import { HeadingCss } from "../../../styles/style";
import { Divder } from "../../Marketplace/Marketplace";

interface IPersonalDetails {
  first_name: string;
  last_name: string;
  isApiloading?: boolean;
}

const PersonalDetails = ({
  first_name,
  last_name,
  isApiloading,
}: IPersonalDetails) => {
  if (isApiloading) return <APILoader />;
  return (
    <>
      <Divder />
      <Box as="h1" css={HeadingCss}>
        Personal Details
      </Box>
      <Flex direction={"column"} css={{ gap: "20px" }}>
        <InputField
          label="First Name"
          value={first_name}
          placeholder="FirstName"
        />
        <InputField
          label="Last Name"
          value={last_name}
          placeholder=" LastName"
        />
      </Flex>
    </>
  );
};

export default PersonalDetails;
