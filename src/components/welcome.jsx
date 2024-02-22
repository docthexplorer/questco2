import useQuestState from "../hooks/useQuestState";
import { BeatLoad } from "./ui-loaders";

export default function Welcome() {
  const { questState, isLoading } = useQuestState();

  return (
    <>
      <span className="greetings">
        Welcome back,{" "}
        {isLoading ? <BeatLoad display="inline" /> : <strong>{questState.questUser}</strong>}
      </span>
    </>
  );
}
