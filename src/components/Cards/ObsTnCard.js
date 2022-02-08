import Reviewer from "@libraries/review/components/Reviewer";
import { use } from "i18next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

import useAppAuth from "@hooks/app/useAppAuth";
import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsTnCard({
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
  const repoName = resource.name.split("_");
  const path = "/tn_OBS.tsv";
  const fields = {
    id: selectedQuote?.ID,
    link: `https://tcc-idiomaspuentes.netlify.app/pl/${
      resource.owner.username
    }/${repoName[0]}/${repoName[1] + path}?ID=${selectedQuote?.ID}`,
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

  const notes = useMemo(() => {
    if (content) {
      const [headers, ...notes] = content.split("\n");
      const headersArr = headers.split("\t");
      return notes.map((note) => {
        return note.split("\t").reduce((acc, curr, idx) => {
          return { ...acc, [headersArr[idx]]: curr };
        }, {});
      });
    }
  }, [content]);

  const items = useMemo(() => {
    if (notes) {
      return notes.filter((note) => {
        return note.Reference === `${story}:${frame}`;
      });
    }
  }, [frame, notes, story]);

  return (
    !error && (
      <>
        <ResourceCard
          cardRef={getRef}
          title={resource.title}
          chapter={story}
          verse={frame}
          items={items}
          selectedQuote={selectedQuote}
          setQuote={setQuote}
          onItemChange={onItemChange}
          markdown={markdown}
          languageId="es-419"
          isLoading={isLoading}
          classes={classes}
          shouldSetQuoteOnClick
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

export default ObsTnCard;
