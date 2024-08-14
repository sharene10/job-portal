import {
  Button,
  Flex,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jobPostAction } from "../Redux/Actions/jobAction";

const bgImg =
  "https://thumbs.dreamstime.com/b/dark-purple-old-brick-wall-backdrop-dark-purple-old-brick-wall-backdrop-architecture-facade-texture-house-interior-background-186012938.jpg";

let initState = {
  companyName: "",
  position: "",
  contract: "",
  location: "",
};

const AdminJobFormPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [formData, setFormData] = useState(initState);
  const { companyName, position, location, contract } = formData;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function Toaster(title, message, status) {
    return toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1500,
      isClosable: true,
    });
  }

  const handleClick = () => {
    dispatch(jobPostAction(formData, Toaster));
    setFormData(initState);
  };

  return (
    <Box
      width={"100%"}
      h={"100vh"}
      margin="auto"
      color="black"
      bgImage={bgImg}
      bgSize="cover"
      bgPosition="center"
      p="6"
      backgroundRepeat={"no-repeat"}
      position="relative"
      overflow="hidden"
    >
      {/* Gradient overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))"
        zIndex="0"
      />

      <Flex
        bg="teal.500"
        maxW={{ md: "40%", sm: "50%", base: "60%" }}
        m="auto"
        justify={"center"}
        my="4"
        py="4"
        px="6"
        rounded="lg"
        boxShadow="lg"
        position="relative"
        zIndex="1"
      >
        <Text
          as="b"
          fontSize={{ md: "20px", sm: "16px", base: "14px" }}
          color="white"
          textAlign={"center"}
        >
          Welcome - Add New Job Here
        </Text>
      </Flex>
      <Grid
        mt={4}
        w={{ md: "40%", sm: "60%", base: "90%" }}
        h={"auto"}
        m={"auto"}
        bg={"white"}
        p="6"
        rounded="lg"
        boxShadow="xl"
        templateColumns="repeat(1, 1fr)"
        gap={4}
        position="relative"
        zIndex="1"
      >
        <GridItem>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"} color="teal.600">
              Company Name
            </FormLabel>
            <Input
              placeholder="Enter company name"
              type="text"
              name="companyName"
              value={companyName}
              onChange={handleChange}
              focusBorderColor="teal.500"
              borderColor="teal.300"
            />
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"} color="teal.600">
              Position
            </FormLabel>
            <Select
              placeholder="Select Position"
              name="position"
              value={position}
              onChange={handleChange}
              focusBorderColor="teal.500"
              borderColor="teal.300"
            >
              <option value="Senior Software Engineer">Senior Software Engineer</option>
              <option value="Senior Application Engineer">Senior Application Engineer</option>
              <option value="Haskell and Pure Script Dev">Haskell and Pure Script Dev</option>
              <option value="Remote DevOps Engineer">Remote DevOps Engineer</option>
              <option value="Midlevel Back End Engineer">Midlevel Back End Engineer</option>
              <option value="Desktop Support Manager">Desktop Support Manager</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"} color="teal.600">
              Contract
            </FormLabel>
            <Select
              placeholder="Select Contract"
              name="contract"
              value={contract}
              onChange={handleChange}
              focusBorderColor="teal.500"
              borderColor="teal.300"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <FormLabel fontWeight={"bold"} color="teal.600">
              Location
            </FormLabel>
            <Input
              placeholder="Enter location"
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
              focusBorderColor="teal.500"
              borderColor="teal.300"
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            colorScheme="teal"
            onClick={handleClick}
            w={"full"}
            size="lg"
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "teal.600", boxShadow: "lg" }}
          >
            Add Job
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminJobFormPage;
