import { Box, Flex, Image, Text } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="red"
      subtitle="profile"
      title="David Diniz"
      description="10 public playlists"
      roundImage
      image="https://github.com/DavidWDiniz.png"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex gap="20px">
          {artists.map((artist) => (
            <Box width="16%" key={artist.id}>
              <Box
                width="100%"
                backgroundColor="gray.900"
                borderRadius="4px"
                padding="15px"
              >
                <Image
                  src="https://source.unsplash.com/random/300x300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const data = await prisma.artist.findMany({});
  const artists = JSON.parse(JSON.stringify(data));
  return {
    props: {
      artists,
    },
  };
};

export default Home;
