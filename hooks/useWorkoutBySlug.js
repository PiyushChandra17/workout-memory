import { useEffect, useState } from "react";
import { getWorkoutBySlug } from "../storage/workout";

export const useWorkoutBySlug = (slug) => {
  const [workout, setWorkout] = useState();

  useEffect(() => {
    async function getData() {
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
    }

    getData();
  }, [])

  return workout;
}