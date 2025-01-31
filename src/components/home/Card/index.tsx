import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BlogDataType } from "../../../types/BlogPosts/dataTypes";
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
  Visibility,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
type BlogCardProps = {
  blogItem: BlogDataType;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const BlogCard: React.FC<BlogCardProps> = ({
  blogItem,
  isLike = false,
  isDislike = true,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            NA
          </Avatar>
        }
        action={
          <Stack
            flexDirection="row"
            alignItems="center"
            gap="5px"
            sx={{ opacity: ".5" }}
          >
            <Visibility />
            {blogItem.viewCount}
          </Stack>
        }
        title="Nihat Aliyev"
        subheader="September 14, 2024"
      />
      <CardMedia
        component="img"
        height="194"
        image={`${import.meta.env.VITE_BASE_URL}${blogItem.imageUrl}`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blogItem.subject}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Stack flexDirection="row" alignItems="center" gap="30px">
          <Stack flexDirection="row" alignItems="center">
            <IconButton aria-label="add to favorites">
              {isLike ? <ThumbUp color="primary" /> : <ThumbUpOutlined />}
            </IconButton>
            <Typography>{blogItem.likeCount}</Typography>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <IconButton aria-label="dislike">
              {isDislike ? <ThumbDown color="primary" /> : <ThumbDownOutlined />}
            </IconButton>
            <Typography>{blogItem.dislikeCount}</Typography>
          </Stack>
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
