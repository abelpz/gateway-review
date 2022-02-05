import { use } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";



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

  const path = useMemo(() => {
    if (selectedQuote?.SupportReference) {
      const ref = selectedQuote.SupportReference?.replace("rc://*/ta/man/", "");
      console.log({ ref });
      return `${ref}/01.md`
    }
    return null
  },[selectedQuote]);

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
      <ResourceCard
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
    )
  );
}

export default ObsTaCard;