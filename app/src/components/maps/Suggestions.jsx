import React from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';

const Suggestions = ({ suggestions, onSelect }) => (
    <List>
        {suggestions.map(({ id, title, subtitle, address }) => (
            <ListItem key={id} onClick={() => onSelect(id, address)} button>
                <ListItemText
                    primary={title}
                    secondary={subtitle}
                />
            </ListItem>
        ))}
    </List>
)

Suggestions.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    })).isRequired
}

Suggestions.defaultProps = {
    suggestions: []
}

export default Suggestions;
