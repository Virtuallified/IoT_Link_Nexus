"use client";

import React, { useState, useEffect } from "react";
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
} from "@nextui-org/react";
import { getActivityPaginate } from "../api/firestore/sensor/route";
import { columns } from "../constants/activity.constant";
import { BlurTop } from "./reusable/BlurBack";

export default function ActivityPage() {
  const [activityData, setActivityData] = useState([]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(activityData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return activityData.slice(start, end);
  }, [page, activityData]);

  useEffect(() => {
    // Fetch activity data asynchronously
    const fetchActivityData = async () => {
      try {
        const response = await getActivityPaginate(1); // Wait for the promise to resolve
        setActivityData(response.results);
      } catch (error) {
        console.error("Error fetching activity data:", error);
      }
    };

    fetchActivityData();
  }, []);

  return (
    <>
      <BlurTop />
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
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
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={activityData}>
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
