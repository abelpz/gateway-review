import { use } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

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
  const path = "/tn_OBS.tsv";

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
      <ResourceCard
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
    )
  );
}

export default ObsTnCard;
