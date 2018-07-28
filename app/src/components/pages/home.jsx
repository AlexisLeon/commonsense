import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { listSuggestions, clearSuggestions } from '../../actions/suggestions';
import { retrieveDirections } from '../../actions/directions';
import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Directions from '../maps/Directions';
import TextField from '../common/TextField';
import Suggestions from '../maps/Suggestions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestionType: null
    };

    this.getDirections = this.getDirections.bind(this);
    this.selectSuggestion = this.selectSuggestion.bind(this);
  }

  componentDidUpdate(prevProps, _) {
    if (prevProps.origin !== this.props.origin) {
      this.setState({ suggestionType: 'origin' }, () => {
        this.props.listSuggestions(this.props.origin);
      });
    } else if (prevProps.destination !== this.props.destination) {
      this.setState({ suggestionType: 'destination' }, () => {
        this.props.listSuggestions(this.props.destination);
      });
    }
  }

  getDirections({ origin, destination }) {
    console.log(origin, destination);
    this.props.retrieveDirections(origin, destination);
    // 'Insurgentes sur 601', 'WeWork Montes Urales'
  }

  selectSuggestion(placeId, address) {
    this.props.change(this.state.suggestionType, address);
    this.setState({ suggestionType: null });
    this.props.clearSuggestions()
  }

  render() {
    const {
      handleSubmit,
      retrieveDirections,
      origin,
      destination,
      suggestions,
      directions,
      loading,
      errorMessage,
      classes,
    } = this.props;

    return (
      <div>
        <Typography variant="title">Common Sense Test</Typography>
        <Grid container spacing={16}>
          <Grid item xs={6} sm={4}>
            <Field
              label="Origin"
              name="origin"
              component={TextField}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
          <Field
              label="Destination"
              name="destination"
              component={TextField}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" onClick={handleSubmit(this.getDirections)}>
              Get directions
            </Button>
          </Grid>
        </Grid>

        {suggestions.length !== 0 && (
          <Paper elevation={1}>
            <Suggestions suggestions={suggestions} onSelect={this.selectSuggestion} />
          </Paper>
        )}

        {directions.steps.length !== 0 && (
          <Paper className={classes.directions}>
            <Directions steps={directions.steps} />
          </Paper>
        )}
      </div>
    )
  }
}

const styles = theme => ({
  directions: {
    marginTop: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const StyledComponent = withStyles(styles)(Home);

const form = reduxForm({
  form: 'directions',
  // TODO: Form config and validation
  validate(values) {
    const errors = {};

    // Name Form
    if (!values.origin) errors.origin = 'Required';
    if (!values.destination) errors.destination = 'Required';
    if (!values.mode) errors.gender = 'Please select one';
    else if (['walking', 'driving'].indexOf(values.mode) < 0) errors.mode = 'Invalid mode';

    return errors;
  },
})(StyledComponent);

const selector = formValueSelector('directions');

function mapStateToProps(state) {
  const { suggestions, directions } = state;

  return {
    origin: selector(state, 'origin'),
    destination: selector(state, 'destination'),
    suggestions: suggestions.suggestions,
    directions: directions.directions,
    loading: directions.directionsLoading,
    errorMessage: directions.directionsError,
  };
}

const mapDispatchToProps = {
  listSuggestions,
  clearSuggestions,
  retrieveDirections,
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
