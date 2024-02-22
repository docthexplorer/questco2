import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import QuestTiles from "../components/quest-tiles";
import Skeleton from "../components/skeletons/skeleton";
import useAuth from "../hooks/useAuth";

export default function AllQuests() {
  const { setQuestPath } = useAuth();
  const { setAuthExpires } = useAuth();
  const [allQuests, setAllQuests] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchQuests = async () => {
      try {
        const response = await axiosPrivate.get("/quests", {
          signal: controller.signal,
        });
        isMounted &&
          setTimeout(() => {
            setAllQuests(response.data);
          }, 2000);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setAuthExpires(true);
          return navigate("/", { state: { from: location }, replace: true });
        }
        console.error(err);
      } finally {
        if (location.pathname === "/quests/all-quests") {
          return setQuestPath({
            all: true,
            user: false,
          });
        }
      }
    };
    fetchQuests();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  function createQuestTile(quest) {
    const startQuest = async () => {
      await axiosPrivate
        .get(`/start-quest/${quest._id}`)
        .then((response) => {
          if (response.status === 200)
            return navigate("..", { relative: "path" });
        })
        .catch((err) => console.log(err));
    };

    return (
      <QuestTiles
        key={quest._id}
        title={quest.title}
        class={quest.class}
        color={quest.color}
        progressBtnvisible="none"
        text="start challenge"
        requestQuest={startQuest}
        questBtnClass="btn btn-outline-secondary fontz align-items-center quest-btn-class"
      />
    );
  }

  return (
    <div className="quest-body-mobile">
      {allQuests ? (
        <div className="d-flex flex-column gap-3 align-items-center">
          <div className="quest-hint">
            <h2>
              <strong>#Hint</strong>
            </h2>
            <h3>
              Select a quest tile to begin quest challenge. You will be
              redirected to <strong>"my challenges"</strong> upon tile
              selection. Multiple tiles can be added to your challenge
              directory.
            </h3>
          </div>
          <div className="tile-container">{allQuests.map(createQuestTile)}</div>
        </div>
      ) : (
        <div className="tile-container">
          {[...Array(24).keys()].map((i) => {
            return <Skeleton key={i} />;
          })}
        </div>
      )}
    </div>
  );
}
