import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { MarketplaceCardProp } from "../type";
const MarketPlaceCard = (props: MarketplaceCardProp) => {
  const { imageUrl, isPadding } = props;
  return (
    <Flex
      direction={"column"}
      css={{
        height: "100%",
        width: "122px",
      }}
    >
      <Box
        css={{
          borderRadius: "8px",
          height: "156px",
          p: isPadding ? "$4 $4 0 " : "",
          background: "$white",
          border: "1px solid #D9D9D9",
        }}
      >
        <Box
          as="img"
          css={{
            height: "100%",
            width: "100%",
            maxHeight: "156px",
            maxWidth: "122px",
          }}
          src={imageUrl}
        />
      </Box>
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Box
          css={{
            fontSize: "$16",
            fontWeight: "$bold",
            fontFamily: "$Gilmer",
            color: "$primary",
            margin: "13px 0 8px",
          }}
        >
          Human
        </Box>

        <Flex css={{ gap: "4px", marginTop: "0.5rem" }}>
          <Box
            as="img"
            src="/images/Vector.png"
            css={{ width: "25px", height: "25px", alignSelf: "baseline" }}
          />
          <Box
            as="span"
            css={{
              fontSize: "$14",
              fontFamily: "$Baloo",
              color: "$primary",
            }}
          >
            250
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MarketPlaceCard;
