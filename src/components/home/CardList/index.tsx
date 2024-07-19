import React from "react";
import { BlogCard } from "../Card";
import { BlogDataType } from "../../../types/BlogPosts/dataTypes";
import { Box, Stack } from "@mui/material";

type CardListProps = {
  data: BlogDataType[];
};

export const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <Stack gap="20px" >
      {data?.map((item: BlogDataType) => (
        <BlogCard key={item.id} blogItem={item} />
      ))}
    </Stack>
  );
};
