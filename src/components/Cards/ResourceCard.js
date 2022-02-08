import React, { useEffect, useState } from "react";
import { Card, CardContent } from "translation-helps-rcl/dist/components";
import { useCardState, useContent } from "translation-helps-rcl/dist/hooks";

function ResourceCard({
  cardRef,
  editable = false,
  selectedQuote,
  setQuote,
  title,
  items = [],
  markdown = null,
  viewMode = "default",
  filters: columnFilters,
  verse,
  chapter,
  languageId,
  isLoading,
  classes,
  onItemChange,
  shouldSetQuoteOnClick = false,
  ...props
}) {
  const {
    state: { item, headers, filters, fontSize, itemIndex, markdownView },
    actions: { setFilters, setFontSize, setItemIndex, setMarkdownView },
  } = useCardState({
    items,
    verse,
    chapter,
    selectedQuote,
    setQuote,
  });

  useEffect(() => {
    if (columnFilters) {
      setFilters(columnFilters);
    }
  }, [columnFilters, setFilters]);

  useEffect(() => {
    if (shouldSetQuoteOnClick && item && setQuote) {
      const { Quote, SupportReference, Occurrence, TWLink, ID, filePath } =
        item;
      const quote = {
        Quote,
        SupportReference,
        Occurrence,
        TWLink,
        ID,
        filePath,
      };
      setQuote(
        Object.keys(quote).reduce(
          (prev, current) =>
            !!quote[current]
              ? { ...prev, [current]: quote[current] }
              : { ...prev },
          {}
        )
      );
    }
  }, [item, setQuote, shouldSetQuoteOnClick]);

  const showSaveChangesPrompt = () => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  useEffect(() => {
    if (onItemChange) onItemChange({ itemIndex, item });
  }, [itemIndex, onItemChange, setItemIndex, item]);

  return (
    <Card
      dragRef={cardRef}
      items={items}
      title={title}
      headers={headers}
      filters={filters}
      fontSize={fontSize}
      itemIndex={itemIndex}
      setFilters={setFilters}
      setFontSize={setFontSize}
      setItemIndex={setItemIndex}
      markdownView={markdownView}
      setMarkdownView={setMarkdownView}
      showSaveChangesPrompt={showSaveChangesPrompt}
      classes={classes}
      editable={editable}
      {...props}
    >
      <CardContent
        item={item}
        editable={editable}
        filters={filters}
        fontSize={fontSize}
        markdown={markdown}
        isLoading={isLoading}
        languageId={languageId}
        viewMode={viewMode}
        markdownView={markdownView}
        selectedQuote={selectedQuote}
        setQuote={setQuote}
        showSaveChangesPrompt={showSaveChangesPrompt}
      />
    </Card>
  );
}

export default ResourceCard;
