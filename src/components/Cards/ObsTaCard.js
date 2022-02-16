import Reviewer from "@libraries/review/components/Reviewer";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import useAppAuth from "@hooks/app/useAppAuth";
import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsTaCard({
  resource,
  story,
  frame,
  onItemChange,
  markdown = null,
  languageId,
  classes,
  ...props
}) {
  const [note] = useSelector(({ reference }) => [reference.note]);
  console.log({note})
  const [auth] = useAppAuth();
  const [cardRef, setCardRef] = useState(null);
  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);
  const path = useMemo(() => {
    if (note?.SupportReference) {
      const ref = note.SupportReference?.replace("rc://*/ta/man/", "");
      return `/${ref}/01.md`;
    }
    return null;
  }, [note]);
  const repoName = resource.name.split("_");
  const fields = {
    id: note?.SupportReference,
    link: `https://tcc-idiomaspuentes.netlify.app/pl/${
      resource.owner.username
    }/${repoName[0]}/${repoName[1] + path}`,
  };

  const {
    file: content,
    isLoading,
    error,
  } = useFileContent({
    owner: resource.owner.username,
    repo: resource.name,
    path,
  });

  const items = content ? [{ markdown: content, path }] : null;

  return (
    !error && (
      <>
        <ResourceCard
          cardRef={getRef}
          title={resource.title}
          chapter={story}
          verse={frame}
          items={items}
          markdown={markdown}
          viewMode="markdown"
          languageId="es-419"
          isLoading={isLoading}
          classes={classes}
          {...props}
        />
        <Reviewer
          preppend="OBS-review"
          fields={fields}
          repo={resource}
          target={cardRef}
          authentication={auth}
        />
      </>
    )
  );
}

export default ObsTaCard;
