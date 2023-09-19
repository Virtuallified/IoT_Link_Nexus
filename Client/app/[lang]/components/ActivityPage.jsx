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
} from "@nextui-org/react";
import { getActivityPaginate } from "../api/firestore/sensor/route";
import { columns } from "../constants/activity.constant";
import { BlurTop } from "./reusable/BlurBack";

export default function ActivityPage() {
  const [activityData, setActivityData] = useState([]);

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
      <Table aria-label="Example table with dynamic content">
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
