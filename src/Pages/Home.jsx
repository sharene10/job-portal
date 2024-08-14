import { Box, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  // Updated background image URL
  const imgurl = "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  const bgImg = 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

  return (
    <Box 
      w="100%" 
      h={{ md: '100vh', sm: '90vh', base: "90vh" }} 
      py="4" 
      bgImage={bgImg} 
      bgRepeat="no-repeat" 
      bgSize="cover"
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
    >
      <Flex 
        bg="rgba(0, 0, 0, 0.7)" 
        w={{ md: "60%", sm: "80%", base: "90%" }} 
        p={{ base: "6", md: "8" }} 
        borderRadius="lg" 
        boxShadow="lg" 
        justify="center" 
        my="4"
        align="center"
        textAlign="center"
      >
        <Text 
          as="b" 
          fontSize={{ md: '32px', sm: '24px', base: '20px' }} 
          color="white"
        >
          Welcome To Job Search App
        </Text>
      </Flex>

      <Box 
        width={{ md: "60%", sm: "80%", base: "90%" }} 
        m="auto" 
        p={{ base: "4", md: "6" }} 
        bg="whiteAlpha.800" 
        borderRadius="lg" 
        boxShadow="md"
        overflow="hidden"
      >
        <Image 
          boxSize="100%" 
          objectFit="cover" 
          borderRadius="lg" 
          src={imgurl} 
          alt="Job Search"
        />
      </Box>

      <Flex 
        bg="teal.700" 
        w={{ md: "60%", sm: "80%", base: "90%" }} 
        p={{ base: "6", md: "8" }} 
        borderRadius="lg" 
        boxShadow="lg" 
        justify="center" 
        my="4"
        align="center"
        textAlign="center"
      >
        <Text 
          as="b" 
          fontSize={{ md: '32px', sm: '24px', base: '20px' }} 
          color="white"
        >
          Find Your Favourite Job
        </Text>
      </Flex>
    </Box>
  );
};

export default Home;
