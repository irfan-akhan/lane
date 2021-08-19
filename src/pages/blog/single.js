import React from "react";
import { Grid } from "@material-ui/core";
import Post from "../../components/Singlepost";
import postStyles from "../../styles/SinglePost.module.css";
const single = (post) => {
  return (
    <div className={postStyles.postMain}>
      <Grid container xs={10} justifyContent="center">
        {console.log(post)}
        <Post />
      </Grid>
    </div>
  );
};

export default single;
