import Reviewer from "@libraries/review/components/Reviewer";
import { use } from "i18next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

import useAppAuth from "@hooks/app/useAppAuth";
import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsTaCard({
  selectedQuote,
  setQuote,
  resource,
  story,
  frame,
  onItemChange,
  markdown = null,
  languageId,
  classes,
}) {
  const [auth] = useAppAuth();
  const [cardRef, setCardRef] = useState(null);
  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);
  const path = useMemo(() => {
    if (selectedQuote?.SupportReference) {
      const ref = selectedQuote.SupportReference?.replace("rc://*/ta/man/", "");
      return `/${ref}/01.md`;
    }
    return null;
  }, [selectedQuote]);
  const repoName = resource.name.split("_");
  const fields = {
    id: selectedQuote?.SupportReference,
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
          onItemChange={onItemChange}
          markdown={markdown}
          viewMode="markdown"
          languageId="es-419"
          isLoading={isLoading}
          classes={classes}
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
