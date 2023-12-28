import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const WorkoutEditForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const navigate = useNavigate(null);

  // query fn

  const getWorkout = async ({ queryKey }) => {
    const id = queryKey[1];
    const { data } = await axios.get("http://localhost:4000/api/workout/" + id);

    return data;
  };

  const { data, status } = useQuery(["workouts", id], getWorkout);

  // mutation fn
  const updateWorkout = async (params) => {
    const { id, workout } = params;
    try {
      const { data } = await axios.patch(
        "http://localhost:4000/api/workout/" + id,
        workout
      );
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      navigate('/')
      toast.success(data.message);
      return data;
    } catch (e) {
      if (e.response.status === 400) {
        setError(e.response.data.message);
        setEmptyFields(e.response.data.emptyFields);
      }
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateWorkout, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts");
    },
  });

  const updateWorkoutHandler = (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    mutate({ id, workout });
  };

//   effect goes here 

  useEffect(() => {
    setTitle(data?.data.title);
    setLoad(data?.data.load);
    setReps(data?.data.reps);
  }, [data]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="create" onSubmit={updateWorkoutHandler}>
        <h3>Edit Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          defaultValue={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          defaultValue={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <button>Update Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutEditForm;
