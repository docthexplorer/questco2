import QuestTiles from "../components/quest-tiles";

export default function CreateQuestTile(quest) {
  return <QuestTiles key={quest._id} title={quest.title} icon={quest.icon} />;
}
