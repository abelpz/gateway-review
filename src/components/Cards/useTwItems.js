import React, { useEffect, useMemo, useState } from "react";

import useFileContent from "@hooks/repos/useFileContent";
import useFilesContent from "@hooks/repos/useFilesContent";

function useTwItems({ twlResource, twResource, story, frame }) {
  const path = "/twl_OBS.tsv";
  const [paths, setPaths] = useState([]);
  const {
    files: articles,
    isLoading: isLoadingWords,
    error: errorLoadingWords,
  } = useFilesContent({
    owner: twResource.owner.username,
    repo: twResource.name,
    paths,
  });

  const {
    file: twl,
    isLoading,
    error,
  } = useFileContent({
    owner: twlResource.owner.username,
    repo: twlResource.name,
    path,
  });

  const wordsList = useMemo(() => {
    if (twl) {
      const [headers, ...rows] = twl.split("\n");
      const headersArr = headers.split("\t");

      return rows.map((row) => {
        return row.split("\t").reduce((acc, curr, idx) => {
          return { ...acc, [headersArr[idx]]: curr };
        }, {});
      });
    }
  }, [twl]);

  const twlItems = useMemo(() => {
    if (wordsList) {
      return wordsList.filter((word) => {
        return word.Reference === `${story}:${frame}`;
      });
    }
  }, [frame, wordsList, story]);

  useEffect(() => {
    setPaths(
      twlItems
        ? twlItems.map(
            (word) => `${word.TWLink.replace("rc://*/tw/dict/", "")}.md`
          )
        : []
    );
  }, [twlItems]);
  console.log({ paths });

  const twItems = useMemo(() => {
    if (twlItems && articles) {
      return twlItems.map((word, idx) => ({
        ...word,
        markdown: articles && articles[idx],
        filePath: paths && paths[idx]
      }));
    }
  }, [articles, twlItems, paths]);

  console.log({ twItems, twlItems });

  return {
    isLoading: isLoading && isLoadingWords,
    isError: error && errorLoadingWords,
    data: {
      tw: {
        items: twItems,
        title: twResource.title,
      },
      twl: {
        items: twlItems,
        title: twlResource.title,
      },
    },
  };
}

export default useTwItems;
