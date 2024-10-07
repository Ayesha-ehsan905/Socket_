import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { MarketplaceCardProp } from "../type";
const MarketPlaceCard = (props: MarketplaceCardProp) => {
  const {
    imageUrl,
    isPadding,
    name,
    price,
    isBackgroundCollectibles, //styling of background collectibles
    isComingSoon,
  } = props;
  return (
    <Flex
      direction={"column"}
      css={{
        height: "100%",
      }}
    >
      <Flex
        justify={"center"}
        align={"center"}
        css={{
          borderRadius: "8px",
          height: "156px",
          p: isPadding ? "$4 $4 0 " : "",
          background: "$white",
          border: "1px solid #D9D9D9",
        }}
      >
        {isComingSoon ? (
          <Box
            as="span"
            css={{
              fontFamily: "$Gilmer",
              fontWeight: "14px",
              textAlign: "center",
            }}
          >
            More Coming Soon!
          </Box>
        ) : (
          <Box
            as="img"
            css={{
              height: "100%",
              width: "100%",
              maxHeight: "156px",
              maxWidth: isBackgroundCollectibles ? "100%" : "122px",
              objectFit: isBackgroundCollectibles ? "fill" : "contain",
              borderRadius: isBackgroundCollectibles ? "8px" : "0px",
            }}
            src={imageUrl}
          />
        )}
      </Flex>
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Box
          css={{
            fontSize: "14px",
            fontWeight: "$semibold",
            fontFamily: "$Gilmer",
            color: "$primary",
            margin: "13px 0 0px",
          }}
        >
          {name}
        </Box>

        {!isComingSoon && (
          <Flex css={{ gap: "4px", marginTop: "0.5rem" }} align={"center"}>
            <Box
              as="img"
              src="/images/Vector.png"
              css={{
                width: "25px",
                height: "25px",
                alignSelf: "baseline",
              }}
            />
            <Box
              as="span"
              css={{
                fontSize: "$14",
                fontFamily: "$Baloo",
                color: "$primary",
              }}
            >
              {price}
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default MarketPlaceCard;
