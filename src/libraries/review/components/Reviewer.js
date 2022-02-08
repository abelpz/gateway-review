import ContextMenu from "./ContextMenu";


const { useEffect, useState } = require("react");

export default function Reviewer({ target, fields = {}, authentication, org, repo, preppend = "" }) {
  const [issueQuote, setIssueQuote] = useState(null);
  const [position, setPosition] = useState();

  const onClose = () => {
    setPosition(null);
  };

  const getOccurrence = (selection, target) => {
    function getWord() {
      const txt = selection;
      const txtRange = txt.getRangeAt(0);
      return txtRange;
    }

    const t = getWord();
    const text = target;
    const precedingRange = document.createRange();
    precedingRange.setStartBefore(text.firstChild);
    precedingRange.setEnd(t.startContainer, t.startOffset);

    const textPrecedingSelection = precedingRange.toString();
    const count =
      (
        textPrecedingSelection.match(new RegExp(t.toString().trim(), "gi")) ||
        []
      ).length + 1;

    return count;
  };

  useEffect(() => {
    if (target) {
      console.log({ target });
      const onContextMenu = (event) => {
        const selection = window.getSelection();
        if (!selection.isCollapsed) {
          event.preventDefault();
          const selectionText = selection.toString();
          setPosition(
            position === null
              ? {
                  mouseX: event.clientX - 2,
                  mouseY: event.clientY - 4,
                }
              : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null
          );
          setIssueQuote({
            quote: selectionText,
            occurrence: getOccurrence(selection, target),
          });
          return false;
        }
      };
      target?.addEventListener("contextmenu", onContextMenu);
      return () => {
        target.removeEventListener("contextmenu", onContextMenu);
      };
    }
  }, [target, position]);
  console.log({ issueQuote });

  return issueQuote ? (
    <ContextMenu
      fields={fields}
      repo={repo}
      position={position}
      onClose={onClose}
      quote={issueQuote}
      authentication={authentication}
      preppend={preppend}
    />
  ) : (
    <></>
  );
}