import { Box, Flex, Image, Text } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="red"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
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
                  src={`https://picsum.photos/400?random=${artist.id}`}
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
