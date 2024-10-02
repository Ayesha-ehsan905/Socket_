import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import { Box } from "../../../components/elements";
import { Flex } from "../../../components/Flex/Flex";
import InputField from "../../../components/InputFeild/InputFeild";
import { HeadingCss } from "../../../styles/style";
import { Divder } from "../../Marketplace/Marketplace";

const PersonalDetails = () => {
  const { userData } = useAuth();

  return (
    <>
      <Divder />
      <Box as="h1" css={HeadingCss}>
        PersonalDetails
      </Box>
      <Flex direction={"row"} css={{ gap: "24px" }}>
        <InputField
          label="First Name"
          value={userData?.user?.first_name ? userData?.user?.first_name : ""}
        />
        <InputField
          label="Last Name"
          value={userData?.user?.last_name ? userData?.user?.last_name : ""}
        />
      </Flex>
    </>
  );
};

export default PersonalDetails;
