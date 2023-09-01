import { useDispatch } from "react-redux";
import deleteGoal from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const deleteG = () => {
    console.log(goal._id);
    dispatch(deleteGoal(goal._id));
  };
  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button onClick={deleteG} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
