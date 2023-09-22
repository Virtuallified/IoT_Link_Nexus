"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Tooltip,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { getActivityPaginate } from "../api/firestore/sensor/route";
import { columns } from "../constants/activity.constant";
import { BlurTop } from "./reusable/BlurBack";

export default function ActivityPage() {
  const [activityData, setActivityData] = useState([]);

  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const rowsPerPage = 10;

  const pages = useMemo(() => {
    return activityData?.count
      ? Math.ceil(activityData.count / rowsPerPage)
      : 0;
  }, [activityData?.count, rowsPerPage]);

  const loadingState = activityData?.results?.length === 0 ? "loading" : "idle";

  // Fetch activity data asynchronously
  const fetchActivityData = async () => {
    try {
      const response = await getActivityPaginate(page, nextPage, rowsPerPage); // Wait for the promise to resolve
      setActivityData(response);
      setNextPage(response.next);
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };

  useEffect(() => {
    fetchActivityData();
  }, [page]);

  return (
    <>
      <BlurTop />
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={activityData?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "liveStatus" ? (
                    item[columnKey] ? (
                      <Chip color="success" variant="dot">
                        ON
                      </Chip>
                    ) : (
                      <Chip color="danger" variant="dot">
                        OFF
                      </Chip>
                    )
                  ) : columnKey === "_id" ? (
                    <Tooltip
                      key={"right"}
                      placement={"right"}
                      content={getKeyValue(item, columnKey)}
                      color="default">
                      <span>
                        {getKeyValue(item, columnKey).substring(0, 8)}
                      </span>
                    </Tooltip>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
