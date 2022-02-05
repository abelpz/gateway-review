import React, { useEffect, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

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

  return (
    !error && (
      <ResourceCard
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
      />
    )
  );
}

export default ObsCard;
