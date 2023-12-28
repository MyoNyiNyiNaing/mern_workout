import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import {Link} from "react-router-dom"

const deleteWorkout = async (id) => {
  const { data } = await axios.delete(
    "http://localhost:4000/api/workout/" + id
  );
  toast.success(data.message);
  return data;
};

const WorkoutDetails = ({ workout }) => {
  const queryClient = useQueryClient();

  const { mutate, data } = useMutation(deleteWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts");
    },
  });

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
        <div>
          <span
            className="material-symbols-outlined del"
            onClick={() => {
              mutate(workout._id);
            }}
          >
            delete
          </span>
          <Link to={'/edit/' + workout._id}>
          <span className="material-symbols-outlined edit">edit</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WorkoutDetails;
