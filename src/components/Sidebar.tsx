import { Box } from "@chakra-ui/react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      backgroundColor="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image
            src="/logo.svg"
            alt="Image of a disc with the name trax in the right"
            width={120}
            height={60}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
