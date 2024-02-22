import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import QuestTiles from "../components/quest-tiles";
import Skeleton from "../components/skeletons/skeleton";
import useAuth from "../hooks/useAuth";

export default function UserQuests() {
  const { setQuestPath } = useAuth();
  const [userQuests, setUserQuests] = useState();
  const [noQuest, setNoQuest] = useState(false);
  const { setAuthExpires } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchQuests = async () => {
      try {
        const response = await axiosPrivate.get("/user-quests", {
          signal: controller.signal,
        });
        isMounted &&
          setTimeout(() => {
            if (response.data.length === 0) return setNoQuest(true);
            setUserQuests(response.data);
          }, 2000);
      } catch (err) {
        if (err.name !== "CanceledError") {
          if (err.response.status === 404) {
            return setNoQuest(true);
          } else {
            setAuthExpires(true);
            return navigate("/", { state: { from: location }, replace: true });
          }
        }
        console.error(err);
      } finally {
        if (location.pathname === "/quests/user-quests") {
          return setQuestPath({
            all: false,
            user: true,
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

  function createQuestTile(quest, i) {
    const deleteQuest = async () => {
      await axiosPrivate
        .get(`/delete-quest/${i}`)
        .then((response) => {
          if (response.status === 200) return navigate("..", { relative: "path" });;
        })
        .catch((err) => console.log(err));
    };

    return (
      <QuestTiles
        key={i}
        index={i}
        title={quest.title}
        class={quest.class}
        color={quest.color}
        progressBtnvisible="block"
        text="remove quest"
        requestQuest={deleteQuest}
        questBtnClass="btn btn-outline-secondary fontz align-items-center remove-quest"
      />
    );
  }

  return (
    <div className="quest-body-mobile">
      {noQuest ? (
        <div className="no-quest-found">
          <h1>No quest found!</h1>
          <h3>
            Refresh page or navigate to <strong>"all challenges"</strong> and
            select one from the quest tiles.
          </h3>
        </div>
      ) : userQuests ? (
        <div className="d-flex flex-column gap-3 align-items-center">
          <div className="quest-hint">
            <h2>
              <strong>#Hint</strong>
            </h2>
            <h3>
              Perform a daily task and click on the
              corresponding circular check button upon task completion to
              register your progress. Carry out quest for five consecutive days
              to earn the ultimate quest crown.
            </h3>
          </div>
          <div className="tile-container">
            {userQuests.map(createQuestTile)}
          </div>
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
