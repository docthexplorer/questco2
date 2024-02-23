import React, {
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
} from "react";
import { axiosPrivate } from "../api/axios";
import useQuestState from "../hooks/useQuestState";
import Timer from "./timer";
import useAuth from "../hooks/useAuth";

export default function ProgressBtns(props) {
  const { setQuestAccord } = useAuth();
  const { questState } = useQuestState();
  const effectRun = useRef(false);
  const [id, setId] = useState(0);
  const [delayTime, setDelayTime] = useState([]);
  const questIndex = props.index;
  const progressIndex = id;
  const progressBtns = document.getElementsByName(questIndex);
  let currentTime = useMemo(() => {
    return parseInt(new Date().getTime());
  }, []);

  const progressBtnIteration = useCallback(
    (x, i) => {
      setTimeout(() => {
        return (progressBtns[i + 1].disabled = !progressBtns[i].checked);
      }, parseInt(x - currentTime));
    },
    [progressBtns, currentTime]
  );

  useLayoutEffect(() => {
    let isMounted = true;

    const callRef = () => {
      questState.completedQuests.includes(questIndex)
        ? progressBtns.forEach((btn) => {
            btn.checked = true;
            btn.disabled = true;
            btn.disabled && btn.classList.add("btn-disabled");
          })
        : questState.progressiveQuest.forEach((obj) => {
            let totalDelayTime = parseInt(obj.delayTime);
            obj.index === questIndex &&
              obj.progress.forEach((e) => {
                isMounted &&
                  setDelayTime([parseInt(totalDelayTime - currentTime)]);
                const idx = parseInt(e.id);
                progressBtns[idx].checked = true;
                progressBtns[idx].disabled = true;
                progressBtnIteration(totalDelayTime, idx);
                setId(idx + 1);
              });
          });
    };

    if (effectRun.current) {
      callRef();
    }

    return () => {
      isMounted = false;
      effectRun.current = true;
    };
  }, [
    currentTime,
    progressBtns,
    questState.completedQuests,
    questState.progressiveQuest,
    questIndex,
    setDelayTime,
    progressBtnIteration,
  ]);

  const removeDisable = async (event) => {
    let resetTime = [];
    setDelayTime(resetTime);

    let countDownTime = parseInt(currentTime + 86400000);
    if (event.target.id === `${id}` && id < progressBtns.length - 1) {
      setTimeout(() => {
        progressBtns[id + 1].disabled = !event.target.checked;
      }, 86400000);
      setId(id + 1);
    }
    try {
      const response = await axiosPrivate.post("/quest-progress", {
        questIndex: questIndex,
        progressIndex: progressIndex,
        countDownTime: countDownTime,
      });
      if (response?.status === 200) {
        event.target.disabled = true;
      } else if (response?.status === 202) {
        event.target.disabled = true;
        setQuestAccord(true);
      }
    } catch (err) {}
  };

  return (
    <div className="progressbtn-group">
      <div className="d-flex flex-column">
        <h6 style={{ display: props.progressBtnvisible }}>Day 1</h6>
        <input
          className="progress-btn"
          name={questIndex}
          type="checkbox"
          id="0"
          style={{ display: props.progressBtnvisible }}
          // value={progressIndex}
          onChange={removeDisable}
        />
      </div>
      <div className="d-flex flex-column">
        <h6 style={{ display: props.progressBtnvisible }}>Day 2</h6>
        <input
          className="progress-btn"
          name={questIndex}
          type="checkbox"
          id="1"
          style={{ display: props.progressBtnvisible }}
          // value={progressIndex}
          onChange={removeDisable}
          disabled
        />
        {id === 1 &&
          (delayTime.length > 0 ? (
            <Timer
              duration={delayTime[0]}
              displayOption={props.progressBtnvisible}
            />
          ) : (
            <Timer
              duration={86400000}
              displayOption={props.progressBtnvisible}
            />
          ))}
      </div>
      <div className="d-flex flex-column">
        <h6 style={{ display: props.progressBtnvisible }}>Day 3</h6>
        <input
          className="progress-btn"
          name={questIndex}
          type="checkbox"
          id="2"
          style={{ display: props.progressBtnvisible }}
          // value={progressIndex}
          onChange={removeDisable}
          disabled
        />
        {id === 2 &&
          (delayTime.length > 0 ? (
            <Timer
              duration={delayTime[0]}
              displayOption={props.progressBtnvisible}
            />
          ) : (
            <Timer
              duration={86400000}
              displayOption={props.progressBtnvisible}
            />
          ))}
      </div>
      <div className="d-flex flex-column">
        <h6 style={{ display: props.progressBtnvisible }}>Day 4</h6>
        <input
          className="progress-btn"
          name={questIndex}
          type="checkbox"
          id="3"
          style={{ display: props.progressBtnvisible }}
          // value={progressIndex}
          onChange={removeDisable}
          disabled
        />
        {id === 3 &&
          (delayTime.length > 0 ? (
            <Timer
              duration={delayTime[0]}
              displayOption={props.progressBtnvisible}
            />
          ) : (
            <Timer
              duration={86400000}
              displayOption={props.progressBtnvisible}
            />
          ))}
      </div>
      <div className="d-flex flex-column">
        <h6 style={{ display: props.progressBtnvisible }}>Day 5</h6>
        <input
          className="progress-btn"
          name={questIndex}
          type="checkbox"
          id="4"
          style={{ display: props.progressBtnvisible }}
          // value={progressIndex}
          onChange={removeDisable}
          disabled
        />
        {id === 4 &&
          (delayTime.length > 0 ? (
            <Timer
              duration={delayTime[0]}
              displayOption={props.progressBtnvisible}
            />
          ) : (
            <Timer
              duration={86400000}
              displayOption={props.progressBtnvisible}
            />
          ))}
      </div>
    </div>
  );
}
