import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";

const getBgColor = (id) => {
  const colors = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "pink",
    "purple",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies[process.env.COOKIE_NAME]);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [data] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const playlist = JSON.parse(JSON.stringify(data));
  return {
    props: { playlist },
  };
};

export default Playlist;
