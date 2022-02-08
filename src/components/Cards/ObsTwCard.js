import Reviewer from "@libraries/review/components/Reviewer";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useAppAuth from "@hooks/app/useAppAuth";

import ResourceCard from "./ResourceCard";

function ObsTwCard({
  resource,
  selectedQuote,
  setQuote,
  title,
  story,
  frame,
  onItemChange,
  markdown = null,
  items,
  classes,
  isLoading,
}) {
  const [auth] = useAppAuth();
  const [cardRef, setCardRef] = useState(null);
  console.log(selectedQuote);
  const getRef = useCallback((node) => {
    setCardRef(node);
  }, []);
  const repoName = resource.name.split("_");
  const fields = {
    TWLink: selectedQuote?.TWLink,
    link: `https://tcc-idiomaspuentes.netlify.app/pl/${resource.owner.username}/${repoName[0]}/${repoName[1]}/${selectedQuote.filePath}`,
  };
  return (
    <>
      <ResourceCard
        cardRef={getRef}
        title={title}
        chapter={story}
        verse={frame}
        items={items}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        onItemChange={onItemChange}
        markdown={markdown}
        viewMode={"markdown"}
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
  );
}

export default ObsTwCard;
