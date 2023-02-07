import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { useState } from "react";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [seek, setSeek] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  return (
    <Box>
      <Box>
        <ReactHowler playing={playing} src={activeSong?.url} />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            outline="none"
            variant="link"
            fontSize="24px"
            color={shuffle ? "white" : "gray.600"}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            aria-label="skip"
            outline="none"
            variant="link"
            fontSize="24px"
            icon={<MdSkipPrevious />}
          />
          {!playing ? (
            <IconButton
              aria-label="play"
              outline="none"
              variant="link"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          ) : (
            <IconButton
              aria-label="pause"
              outline="none"
              variant="link"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          )}
          <IconButton
            aria-label="skip"
            outline="none"
            variant="link"
            fontSize="24px"
            icon={<MdSkipNext />}
          />
          <IconButton
            aria-label="repeat"
            outline="none"
            variant="link"
            fontSize="24px"
            color={repeat ? "white" : "gray.600"}
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">2:30</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              id="player-range"
              /* eslint-disable-next-line jsx-a11y/aria-proptypes */
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={100}
            >
              <RangeSliderTrack backgroundColor="gray.800">
                <RangeSliderFilledTrack backgroundColor="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">4:30</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
