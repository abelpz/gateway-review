import React, { useEffect, useMemo } from "react";

import useRepoIssues from "@hooks/api/issues/useRepoIssues";
import useAppAuth from "@hooks/app/useAppAuth";

import { TablePagination } from "@mui/material";
import List from "@mui/material/List";

import Issue from "./Issue";

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export default function RepoIssues({ resource }) {
  const [authentication] = useAppAuth();

  const { setIssue, issues, isLoading, isError } = useRepoIssues({
    resource,
    token: authentication.sha1,
    args: {
      state: "open",
    },
    paged: false,
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    topFunction();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const enhancedIssues = useMemo(() => {
    return (
      !!issues?.length &&
      issues
        .map((issue) => ({
          ...issue,
          metadata: issue.body
            .split(/\n+/g)
            .slice(1)
            .reduce((prev, curr, key, slice) => {
              const title = curr.match(/\*\*(.+)\:/);

              if (title?.length > 1) {
                const pathArray =
                  ["Id", "TWLink", "SupportReference"].includes(title[1]) &&
                  slice[key + 1].match(/(?:\w+\/[\w-]+$)/g);
                const path = !!pathArray?.length ? pathArray[0] : false;
                if (path) prev.path = path;
                return { ...prev, [title[1]]: slice[key + 1] };
              }
              return prev;
            }, {}),
        }))
        .sort((a, b) => { 
          if (a.metadata.path < b.metadata.path) {
            return -1;
          }
          if (a.metadata.path > b.metadata.path) {
            return 1;
          }
          return 0;
        })
    );
  }, [issues]);
  console.log({ enhancedIssues, isLoading, isError });

  return (
    <>
      {isLoading || !enhancedIssues ? (
        "loading..."
      ) : (
        <>
          <TablePagination
            component="div"
            count={enhancedIssues.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {enhancedIssues
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((issue, key) => (
                <Issue key={key} issue={issue}></Issue>
              ))}{" "}
          </List>
          <TablePagination
            component="div"
            count={enhancedIssues.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
}
