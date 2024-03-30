import React from "react";

export type PropsType = {
  children: React.ReactNode;
  onUpload: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
};
