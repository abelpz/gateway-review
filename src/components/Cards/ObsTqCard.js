import { use } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsTqCard({
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
  const path = "/tq_OBS.tsv";

  const {
    file: content,
    isLoading,
    error,
  } = useFileContent({
    owner: resource.owner.username,
    repo: resource.name,
    path,
  });

  const questions = useMemo(() => {
    if (content) {
      const [headers, ...questions] = content.split("\n");
      const headersArr = headers.split("\t");
      return questions.map((question) => {
        return question.split("\t").reduce((acc, curr, idx) => {
          return { ...acc, [headersArr[idx]]: curr };
        }, {});
      });
    }
  }, [content]);

  const items = useMemo(() => {
    if (questions) {
      return questions.filter((question) => {
        return question.Reference === `${story}:${frame}`;
      });
    }
  }, [frame, questions, story]);

  return (
    !error && (
      <ResourceCard
        title={resource.title}
        filters={["ID", "Question", "Response"]}
        chapter={story}
        verse={frame}
        items={items}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        viewMode="default"
        onItemChange={onItemChange}
        markdown={markdown}
        languageId="es-419"
        isLoading={isLoading}
        classes={classes}
      />
    )
  );
}

export default ObsTqCard;
