import {
  Box,
  IconButton,
  Table,
  Td,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";
import { BsPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };
  return (
    <Box backgroundColor="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            aria-label="play button icon"
            icon={<BsPlayFill />}
            colorScheme="green"
            size="lg"
            isRound
            fontSize="30px"
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
