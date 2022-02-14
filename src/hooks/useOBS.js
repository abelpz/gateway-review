import React, { useEffect, useState } from "react";

import useFileContent from "./repos/useFileContent";

export default function useStory({ resource, story }) {
  const [path, setPath] = useState("");
  const [items, setItems] = useState(null);

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

  return { content, items, isLoading, error };
}
