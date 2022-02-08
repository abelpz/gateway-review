import Reviewer from "@libraries/review/components/Reviewer";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useAppAuth from "@hooks/app/useAppAuth";
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
  const [auth] = useAppAuth();
  const [cardRef, setCardRef] = useState(null);
  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);
  const path = "/tq_OBS.tsv";
  const repoName = resource.name.split("_");
  const fields = {
    id: selectedQuote?.ID,
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
      <>
        <ResourceCard
          cardRef={getRef}
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

export default ObsTqCard;
