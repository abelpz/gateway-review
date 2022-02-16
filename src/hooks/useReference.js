import { useDispatch, useSelector } from "react-redux";

import { frameChanged, storyChanged } from "@store/slices/reference";

const useReference = () => {
  const dispatch = useDispatch();

  const [story, frame] = useSelector(({ reference }) => [
    reference.story,
    reference.frame,
  ]);
  const setStory = (story) => {
    dispatch(storyChanged(story.toString()));
  };
  const setFrame = (frame) => {
    dispatch(frameChanged(frame.toString()));
  };
  return {
    state: { story, frame },
    actions: { setStory, setFrame },
  };
};

export default useReference;
