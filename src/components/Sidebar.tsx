import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import Link from "next/link";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      backgroundColor="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image
            src="/logo.svg"
            alt="Image of a disc with the name trax in the right"
            width={120}
            height={60}
          />
        </Box>
        <Box marginBottom="20px">
          <List spacing="2">
            {navMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <LinkOverlay as={Link} href={menu.route} passHref>
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List spacing="2">
            {musicMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <LinkOverlay as={Link} href={menu.route} passHref>
                    <ListIcon as={menu.icon} color="white" marginRight="20px" />
                    {menu.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box paddingX="20px" marginY="20px">
          <Divider color="gray.800" />
        </Box>
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <List spacing="2">
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <LinkOverlay
                    as={Link}
                    href={
                      {
                        pathname: "/playlist/[id]",
                        query: { id: playlist.id },
                      } as unknown as string
                    }
                    passHref
                  >
                    {playlist.name}
                  </LinkOverlay>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
