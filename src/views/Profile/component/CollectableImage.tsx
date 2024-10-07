import { Box } from "../../../components/elements";
import { COLLECTABLE_TYPE } from "../../../utilis/enum";
import { CollectibleImageBoxStyles } from "../../../styles/style";
import { Collectible } from "../../../utilis/type";
import { Flex } from "../../../components/Flex/Flex";

interface ICollectableImageProps {
  collectable: Collectible;
}

// CollectableImage component is a functional component to render the image of the collectable on collectable UI and modal .
const CollectableImage = ({ collectable }: ICollectableImageProps) => {
  return (
    <Flex align={"center"}>
      <Box
        css={{
          ...CollectibleImageBoxStyles,
          padding:
            collectable?.type === COLLECTABLE_TYPE.BACKGROUND
              ? "0"
              : " 8px 8px 0",
          width:
            collectable?.type === COLLECTABLE_TYPE.BACKGROUND ? "94px" : "76px",
        }}
      >
        <Box
          as="img"
          css={{
            height: "100%",
            borderRadius: "8px",
            width: "100%",
            maxHeight: "120px",
            maxWidth:
              collectable?.type === COLLECTABLE_TYPE.BACKGROUND
                ? "100%"
                : "94px",
            objectFit:
              collectable?.type === COLLECTABLE_TYPE.BACKGROUND
                ? "fill"
                : "contain",
          }}
          src={collectable?.image_url}
        />
      </Box>
    </Flex>
  );
};

export default CollectableImage;
