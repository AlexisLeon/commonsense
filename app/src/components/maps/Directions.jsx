import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';

const Directions = ({ steps,  }) => (
    <List>
        {steps.map(({ instructions, maneuver, distance, duration }, index) => (
            <ListItem key={index} onClick={() => onSelect(id, address)}>
                <ListItemText
                    primary={<div dangerouslySetInnerHTML={{ __html: instructions }} />}
                />
                <ListItemSecondaryAction>
                    <ListItemText
                        primary={distance}
                        secondary={duration}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
);

Directions.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
        instructions: PropTypes.string.isRequired,
        maneuver: PropTypes.string,
        distance: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
    })).isRequired,
};

Directions.defaultProps = {
    steps: []
};

export default Directions;
