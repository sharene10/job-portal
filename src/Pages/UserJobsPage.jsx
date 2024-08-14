import {
  Box,
  Grid,
  GridItem,
  VStack,
  Text,
  Image,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchAndFilter from "../Components/SearchAndFilter";
import UserJobListCard from "../Components/UserJobListCard";
import { companiesImg, nodataFound } from "../data/images";
import { getJobListAction } from "../Redux/Actions/jobAction";
import { getAppliedJobAction, jobApplyAction } from "../Redux/Actions/jobAppliedAction";

const UserJobsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const imgs = companiesImg;
  const { loading, jobGetStatus, jobs } = useSelector((state) => state.JobList);
  const { loginStatus } = useSelector((state) => state.UserLogin);
  const { jobAppliedListStatus, response: appliedJobArry } = useSelector((state) => state.AppliedJobs);
  const { appliedStatus, applyLoding } = useSelector((state) => state.JobApply);

  const [filterLoading, setFilterLoading] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [appliedBtnCheck, setAppliedBtnCheck] = useState([]);
  const [idx, setIdx] = useState(null);
  const dispatch = useDispatch();

  const bgImg = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHdvcmt8ZW58MHx8fHwxNjQwMjI3ODIw&ixlib=rb-1.2.1&q=80&w=1080"
  const nodataFoundImg = nodataFound;

  // Define roles, salaries, and experience levels for the 11 cards
  const roles = [
    "Senior Application Engineer",
    "Midlevel Back End Engineer",
    "Midlevel Back End Engineer",
    "Senior Software Engineer",
    "Midlevel Back End Engineer",
    "Haskell and Pure Script Dev",
    "Midlevel Back End Engineer",
    "UI/UX Designer",
    "Remote DevOps Engineer",
    "Senior Application Engineer",
    "Senior Application Engineer",
  ];

  const salaries = [
    "$90,000 - $110,000",
    "$85,000 - $100,000",
    "$100,000 - $120,000",
    "$95,000 - $115,000",
    "$105,000 - $125,000",
    "$80,000 - $95,000",
    "$110,000 - $130,000",
    "$100,000 - $120,000",
    "$95,000 - $115,000",
    "$90,000 - $105,000",
    "$85,000 - $100,000",
  ];

  const experiences = [
    "2-4 years",
    "3-5 years",
    "4-6 years",
    "2-4 years",
    "3-5 years",
    "1-3 years",
    "4-6 years",
    "2-4 years",
    "3-5 years",
    "1-3 years",
    "3-5 years",
  ];

  async function getData() {
    dispatch(getJobListAction());
  }

  const handleApply = (id) => {
    dispatch(jobApplyAction(id, Toaster));
  };

  const getAppliedJobData = () => {
    dispatch(getAppliedJobAction());
  };

  function Toaster(title, message, status) {
    return toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1200,
      isClosable: true,
    });
  }

  useEffect(() => {
    if (!jobGetStatus) {
      getData();
      getAppliedJobData();
    }
    if (jobGetStatus) {
      setJobsData(jobs.jobsList);
    }
    if (!loginStatus) {
      navigate("/Login");
    }
    if (appliedStatus) {
      setIdx(null);
      getAppliedJobData();
    }
    if (jobAppliedListStatus) {
      let found = appliedJobArry.map((ele) => ele.job._id);
      setAppliedBtnCheck(found);
    }
  }, [jobGetStatus, jobAppliedListStatus, appliedStatus, loginStatus]);

  const handleFilter = (value) => {
    setFilterLoading(true);
    if (value === "all") {
      setTimeout(() => {
        setJobsData(jobs.jobsList);
        setFilterLoading(false);
      }, 2000);
    } else {
      const filteredData = jobs.jobsList.filter((ele) => {
        return ele.position.toLowerCase().includes(value.toLowerCase());
      });
      setTimeout(() => {
        setJobsData(filteredData);
        setFilterLoading(false);
      }, 2000);
    }
  };

  return (
    <Box 
      w="100%" 
      minHeight="100vh" 
      bgImage={bgImg} 
      bgSize="cover" 
      bgPosition="center" 
      p={6}
      position="relative"
    >
      {/* Gradient overlay for better readability */}
      <Box 
        position="absolute" 
        top="0" 
        left="0" 
        w="100%" 
        h="100%" 
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))" 
        zIndex={0}
      />
      <Box zIndex={1} position="relative">
        <SearchAndFilter handleFilter={handleFilter} />

        <Grid 
          w="90%" 
          m="auto" 
          templateColumns={{ lg: "repeat(3, 1fr)", md: "repeat(3, 1fr)", sm: "repeat(1, 1fr)" }} 
          gap={6} 
          my={6}
        >
          {!loading && jobs && jobsData.length > 0 && !filterLoading ? (
            jobsData.slice(0, 11).map((ele, i) => {
              let applied = appliedBtnCheck.includes(ele._id);

              // Assign roles, salaries, and experience based on the card index
              let role = roles[i];
              let salary = salaries[i];
              let experience = experiences[i];

              return (
                <GridItem w="100%" h="100%" key={ele._id} align="center">
                  <UserJobListCard
                    applyLoding={applyLoding}
                    {...ele}
                    handleApply={handleApply}
                    index={i}
                    setIdx={setIdx}
                    idx={idx}
                    applyBtn={applied ? "Applied" : "Apply"}
                    imgData={imgs[i]}
                    role={role}
                    salary={salary}
                    experience={experience}
                  />
                </GridItem>
              );
            })
          ) : !filterLoading ? (
            <GridItem colSpan={3} textAlign="center">
              <Text as="b" fontSize="lg" color="gray.600">No Jobs Found</Text>
              <Image boxSize="lg" src={nodataFoundImg} alt="No Data Found" mx="auto" />
            </GridItem>
          ) : (
            <GridItem colSpan={3} textAlign="center">
              <Spinner 
                thickness="4px" 
                speed="0.65s" 
                emptyColor="gray.200" 
                color="blue.500" 
                size="xl" 
              />
              <Text as="b" mt={4} color="gray.600">Loading...</Text>
            </GridItem>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserJobsPage;
