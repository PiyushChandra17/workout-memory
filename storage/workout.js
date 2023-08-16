import { containsKey, storeData, getData, removeItem } from ".";
import data from "../data.json";

export const getWorkouts = async () => {
  const workouts = await getData("workout-data");
  return workouts;
}

export const getWorkoutBySlug = async (slug) => {
  const workouts = await getWorkouts();
  const workout = workouts.filter(w => w.slug === slug)[0]
  return workout;
}


export const initWorkouts = async () => {
  const hasWorkouts = await containsKey("workout-data");
  if (!hasWorkouts) {
    await storeData("workout-data", data);
    return true
  }

  return false;
}

export const storeWorkout = async (newWorkout) => {
  const workouts = await getWorkouts();
  await storeData("workout-data", [newWorkout, ...workouts]);
  return true;
}

export const clearWorkouts = async () => {
  await removeItem("workout-data");
}