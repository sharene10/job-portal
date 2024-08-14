import { Button, ButtonGroup } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import { useState } from "react";

const UserJobListCard = ({
  companyName,
  position,
  contract,
  location,
  imgData,
  handleApply,
  _id,
  applyBtn,
  setI,
  idx,
  index,
  role,
  salary,
  experience,
}) => {
  const [showDetails, setShowDetails] = useState(false); // State to control additional details visibility

  return (
    <Card bg='#0E5E6F' maxW="sm" h="100%" gap={{ md: 4, lg: 2 }}>
      <CardBody>
        <Image boxSize="60%" m="auto" objectFit="contain" src={imgData} alt="IT company" borderRadius="lg" />
        <Stack spacing="3">
          <Heading size="md" as="b" color="white">Company Name: {companyName}</Heading>
          <Text as="b" color="white">Position: {position}</Text>
          <Text as="b" color="white" fontSize="md">Work-Mode: {contract}</Text>
          <Divider />
          <Heading size="sm" as="b" color="white">Location: {location}</Heading>
        </Stack>
      </CardBody>
      
      <CardFooter mt="6" justify="center">
        <ButtonGroup spacing="2">
          <Button
            textAlign="center"
            isLoading={index === idx}
            loadingText="Applying"
            variant={applyBtn === "Applied" ? "solid" : "solid"}
            isDisabled={applyBtn === "Applied"}
            colorScheme={applyBtn === "Applied" ? "red" : "yellow"}
            onClick={() => {
              setShowDetails(!showDetails); // Toggle the visibility of additional details
              setI(index);
            }}
          >
            {applyBtn === "Applied" ? "Applied" : "View Details"}
          </Button>
        </ButtonGroup>
      </CardFooter>
      
      {showDetails && (
        <CardBody>
          <Divider mb={4} />
          <Stack spacing="3">
            <Heading size="sm" as="b" color="white">Role: {role}</Heading>
            <Text as="b" color="white">Salary: {salary}</Text>
            <Text as="b" color="white">Experience Required: {experience}</Text>
          </Stack>
          <ButtonGroup mt={4} spacing="2" justify="center">
            <Button
              colorScheme="blue"
              onClick={() => {
                handleApply(_id);
                setI(index);
              }}
            >
              Apply for this Role
            </Button>
          </ButtonGroup>
        </CardBody>
      )}
    </Card>
  );
};

export default UserJobListCard;
