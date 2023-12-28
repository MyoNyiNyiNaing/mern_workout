import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Toaster, toast } from "react-hot-toast";

const WorkoutCreateForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // mutation fn
  const createWorkout = async (workout) => {
    try {
      const {data}  = await axios.post(
        "http://localhost:4000/api/workout",
        workout
      );
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
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

  const { mutate} = useMutation(createWorkout, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("workouts");
    },
  });

  const createWorkoutHandler =  (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

      mutate(workout);
      
    };
   


  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="create" onSubmit={createWorkoutHandler}>
        <h3>Add a New Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Number of Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default WorkoutCreateForm;
