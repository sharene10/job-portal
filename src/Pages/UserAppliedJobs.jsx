import {
  Box,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nodataFound } from "../data/images";
import {
  deleteAppliedJobAction,
  getAppliedJobAction,
  updateAppliedJobAction,
} from "../Redux/Actions/jobAppliedAction";

const nodataFoundImg = nodataFound;
const bgImg = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGNhcmVlciUyMGdyb3d0aHxlbnwwfHx8fDE2MTY4NzkwMjI&ixlib=rb-1.2.1&q=80&w=1080";

const UserAppliedJobs = () => {
  const [data, setData] = useState([]);
  const { loginStatus, token } = useSelector((state) => state.UserLogin);
  const navigate = useNavigate();
  const toast = useToast();

  const { jobAppliedListStatus, loading, response } = useSelector((state) => state.AppliedJobs);
  const { deleteAppliedJobStatus, response: deltedResponse } = useSelector((state) => state.DelteAppliedJob);
  const dispatch = useDispatch();

  const showToast = (title, message, status) => {
    return toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1500,
      isClosable: true,
    });
  };

  const fetchData = () => {
    dispatch(getAppliedJobAction());
  };

  useEffect(() => {
    if (loginStatus && !jobAppliedListStatus) {
      fetchData();
    } else if (!loginStatus) {
      navigate("/Login");
    }
    if (deleteAppliedJobStatus) {
      showToast("Job Deleted", `${deltedResponse.jobDelted.companyName} job has been deleted.`, "info");
    }
  }, [loginStatus, jobAppliedListStatus, deleteAppliedJobStatus]);

  const handleDelete = (id, job) => {
    dispatch(deleteAppliedJobAction(id));
  };

  const handleStatusChange = (value, id) => {
    dispatch(updateAppliedJobAction(id, value, showToast));
  };

  return (
    <Box
      w="100%"
      m="auto"
      minH="100vh"
      bgImage={bgImg}
      bgSize="cover"
      bgPosition="center"
      p="6"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {!loading && response.length === 0 ? (
        <VStack w="full" m="auto" textAlign="center" spacing={4}>
          <Text as="b" color="black" fontSize="2xl">
            No Jobs Applied Yet
          </Text>
          <Image boxSize="lg" src={nodataFoundImg} alt="No Data Found" />
        </VStack>
      ) : (
        <TableContainer
          px={8}
          w="90%"
          m="auto"
          bg="grey"
          borderRadius="lg"
          boxShadow="md"
        >
          <Table variant="striped" colorScheme="teal">
            <TableCaption>List of Jobs Applied</TableCaption>
            <Thead>
              <Tr>
                <Th color="teal.600">S.No</Th>
                <Th color="teal.600">Company</Th>
                <Th color="teal.600">Role</Th>
                <Th color="teal.600">Location</Th>
                <Th color="teal.600">Status</Th>
                <Th color="teal.600">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!loading && jobAppliedListStatus && response.map((ele, i) => {
                const bgColor = 
                  ele.Status === "Completed" 
                    ? "blue.50" 
                    : ele.Status === "In-Progress" 
                      ? "yellow.50" 
                      : "gray.50";
                return (
                  <Tr
                    key={i}
                    bg={bgColor}
                    _hover={{ bg: "blue.50" }}
                    borderRadius="md"
                    transition="background-color 0.3s"
                  >
                    <Td>{i + 1}</Td>
                    <Td>{ele.job.companyName}</Td>
                    <Td>{ele.job.position}</Td>
                    <Td>{ele.job.location}</Td>
                    <Td>
                      <RadioGroup
                        onChange={(value) => handleStatusChange(value, ele._id)}
                        defaultValue={ele.Status}
                      >
                        <Flex gap="4" alignItems="center">
                          <Radio value="In-Progress" colorScheme="teal">In-Progress</Radio>
                          <Radio value="Completed" colorScheme="teal">Completed</Radio>
                        </Flex>
                      </RadioGroup>
                    </Td>
                    <Td>
                      <MdOutlineDeleteOutline
                        cursor="pointer"
                        onClick={() => handleDelete(ele._id, ele.job.companyName)}
                        size="24px"
                        color="red.500"
                        _hover={{ color: "red.700" }}
                        transition="color 0.3s"
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          {loading && (
            <Flex width="100%" m="auto" justify="center" h="200px" align="center">
              <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
            </Flex>
          )}
        </TableContainer>
      )}
    </Box>
  );
};

export default UserAppliedJobs;
