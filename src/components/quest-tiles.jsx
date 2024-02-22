import ProgressBtns from "./progress-btn";
import { Btn } from "./input-field";
import useAuth from "../hooks/useAuth";
import useQuestState from "../hooks/useQuestState";
import {LinearPorpagation} from "./ui-loaders";

export default function QuestTiles(props) {
  const {questState, isLoading} = useQuestState();
  const {iconStyle, crownStyle } = useAuth();


  return (
    <div className="tile d-flex flex-column justify-content-around gap-3">
      <h3 className="tile-heading">{props.title}</h3>
      <hr style={{ display: props.progressBtnvisible }} />
      <span>
        <i className={props.class} style={iconStyle}></i>
      </span>
      <hr style={{ display: props.progressBtnvisible }} />
      {
      isLoading ?
      <div className="progress-loading">
      <LinearPorpagation progressBtnvisible={props.progressBtnvisible}/>
      </div> :
      <ProgressBtns
        index={props.index}
        progressBtnvisible={props.progressBtnvisible}      
      />
      }
      <Btn
        class={props.questBtnClass}
        text={props.text}
        onclick={props.requestQuest}
      />
      {isLoading ?
      null:
      (questState.completedQuests.includes(props.index) && (
        <i className="fa-duotone fa-crown crown" style={crownStyle}></i>
      ))}
    </div>
  );
}