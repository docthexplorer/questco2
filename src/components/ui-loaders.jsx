import { MoonLoader, PropagateLoader, BeatLoader } from "react-spinners";

function MoonSpinner() {
  return (
    <MoonLoader
      color="#08605F"
      loading={true}
      size={60}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

function BeatLoad(props) {
  return (
    <BeatLoader
      color="#08605F"
      loading={true}
      cssOverride={{
        display: props.display,
      }}
      size={10}
      aria-label="Beat Loading"
      data-testid="beat"
    />
  );
}

function LinearPorpagation({ progressBtnvisible }) {
  return (
    <PropagateLoader
      color={"#94b08a"}
      loading={true}
      cssOverride={{
        display: progressBtnvisible,
      }}
      size={15}
      aria-label="Linear Loading "
      data-testid="propagate"
    />
  );
}

export { MoonSpinner, BeatLoad, LinearPorpagation };
