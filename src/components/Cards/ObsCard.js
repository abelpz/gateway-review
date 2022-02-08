import Reviewer from "@libraries/review/components/Reviewer";
import React, { useCallback, useEffect, useRef, useState } from "react";

import useAppAuth from "@hooks/app/useAppAuth";
import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsCard({
  resource,
  story,
  frame,
  onItemChange,
  markdown = null,
  languageId,
  classes,
}) {
  const [items, setItems] = useState();
  const [path, setPath] = useState("");
  const [cardRef, setCardRef] = useState(null);
  const [auth] = useAppAuth();
  console.log({ auth });
  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);

  const fields = {
    Story: story,
    Frame: frame,
  };

  useEffect(() => {
    setPath(story ? `/content/${story > 9 ? story : "0" + story}.md` : "");
  }, [story]);

  const {
    file: content,
    isLoading,
    error,
  } = useFileContent({
    owner: resource.owner.username,
    repo: resource.name,
    path,
  });

  useEffect(() => {
    if (content) {
      const frames = content.split(/[\r\n]+?(?=!\[.+\))/g);

      setItems(
        frames.map((frame, index) => {
          return {
            ref: [story, index],
            markdown: frame,
          };
        })
      );
    }
  }, [content, story]);
  console.log(cardRef);
  return (
    !error && (
      <>
        <ResourceCard
          cardRef={getRef}
          title={resource.title}
          chapter={story}
          verse={null}
          items={items}
          onItemChange={onItemChange}
          markdown={markdown}
          viewMode="markdown"
          languageId="es-419"
          isLoading={isLoading}
          classes={classes}
          labels={["type-error", "type-suggestion"]}
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
    )
  );
}

export default ObsCard;
