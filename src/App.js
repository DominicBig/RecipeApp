import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as types from "./redux/actionTypes";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  CardHeader,
  CardMedia,
  CardActions,
  Collapse,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons//Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
  gridRoot: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  const classes = useStyles();
  const [search, setSearch] = useState("tomato");
  const [query, setQuery] = useState("");

  const [expanded, setExpanded] = React.useState(false);
  const [cardValue, setCardValue] = useState("");

  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index);
  };

  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.data);

  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query });
  }, [query, dispatch]);

  return (
    <div className="App">
      <Grid item>
        <Typography variant="h3" align="center">
          Recipe Search App
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "80px", height: "50px" }}
            onClick={updateSearch}
          >
            SEARCH
          </Button>
        </form>
      </Grid>
      <Grid item container className={classes.gridRoot}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((item, index) => (
                <Grid item key={index}>
                  <Card sx={{ width: 350 }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: red[500] }}
                          aria-label="recipe"
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.recipe.label}
                      subheader={
                        <span>
                          <DirectionsRunIcon />
                          {Math.round(item.recipe.calories)}
                        </span>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.recipe.image}
                      alt={item.recipe.calories}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={() => handleExpandClick(index)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={index === cardValue && expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph variant="h3">
                          Ingredients:
                        </Typography>
                        {item.recipe.ingredients.map((item) => (
                          <Typography paragraph variant="caption">
                            {item.text}
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
