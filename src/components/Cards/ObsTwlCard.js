import { use } from "i18next";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

import useFileContent from "@hooks/repos/useFileContent";

import ResourceCard from "./ResourceCard";

function ObsTwlCard({
  selectedQuote,
  setQuote,
  title,
  story,
  frame,
  onItemChange,
  markdown = null,
  items,
  classes,
  isLoading
}) {
  return (
    <ResourceCard
      title={title}
      filters={["ID", "TWLink", "OrigWords"]}
      chapter={story}
      verse={frame}
      items={items}
      selectedQuote={selectedQuote}
      setQuote={setQuote}
      onItemChange={onItemChange}
      markdown={markdown}
      viewMode={"table"}
      languageId="es-419"
      isLoading={isLoading}
      classes={classes}
      //shouldSetQuoteOnClick
      disableFilters
      disableNavigation
      hideMarkdownToggle
    />
  );
}

export default ObsTwlCard;
