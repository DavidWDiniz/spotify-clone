import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Image from "next/image";
import { auth } from "../lib/mutations";

const AuthForm = ({ mode }: { mode: "signin" | "signup" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    await router.push("/");
  };

  return (
    <Box width="100vw" height="100vh" backgroundColor="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="gray 1px solid"
      >
        <Image
          src="./logo.svg"
          alt="Image of a disc with the name trax in the right"
          width={120}
          height={60}
        />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" backgroundColor="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" colorScheme="green" isLoading={isLoading}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
