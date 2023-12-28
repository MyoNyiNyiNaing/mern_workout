// components
import WorkoutDetail from "../components/WorkoutDetail";

//lib
import { useQuery } from "react-query";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

// functions
const getWorkouts = async () => {
  
  const { data } = await axios.get("http://localhost:4000/api/workout");
  return data;
};

const Home = () => {
  
  const { data, isLoading, isError} = useQuery("workouts", getWorkouts, {cacheTime: 0});

  if(isLoading){
    return <p>loading...</p>
  }

  if(isError){
    return <p>error...</p>
  }


  return (
    <div className="home">
      <div className="workouts">
        {data?.data.map((workout) => (
          <WorkoutDetail workout={workout} key={workout._id} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
