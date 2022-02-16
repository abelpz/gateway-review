import Reviewer from "@libraries/review/components/Reviewer";
import React, { useCallback, useEffect, useRef, useState } from "react";

import useAppAuth from "@hooks/app/useAppAuth";
import useFileContent from "@hooks/repos/useFileContent";
import useStory from "@hooks/useOBS";

import ResourceCard from "./ResourceCard";

function ObsCard({
  resource,
  story,
  frame,
  setFrame,
  markdown = null,
  items,
  languageId,
  classes,
  isLoading,
  ...props
}) {
  const [cardRef, setCardRef] = useState(null);
  const [auth] = useAppAuth();
  // const [index, setIndex] = useState(null);

  // useEffect(() => {
  //   setFrame(index?.toString());
  // }, [index, setFrame]);

  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);

  const fields = {
    Story: story,
    Frame: frame,
  };

  return (
    <>
      <ResourceCard
        cardRef={getRef}
        title={resource.title}
        chapter={story}
        index={parseInt(frame)}
        setIndex={setFrame}
        verse={null}
        items={items}
        markdown={markdown}
        viewMode="markdown"
        languageId="es-419"
        isLoading={isLoading}
        classes={classes}
        labels={["type-error", "type-suggestion"]}
        disableNavigation
        {...props}
      />
      <Reviewer
        preppend="OBS-review"
        fields={fields}
        repo={resource}
        target={cardRef}
        authentication={auth}
        allowNewLabels
        allowAssignees
      />
    </>
  );
}

export default ObsCard;
