import React, { useEffect, useState } from "react";

export function RenderDateField({ data }: { data: number }) {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    setDate(new Date(data).toLocaleDateString());
  }, [data]);
  return <span>{date}</span>;
}
