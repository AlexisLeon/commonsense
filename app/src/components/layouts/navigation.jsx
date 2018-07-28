import React, { Fragment } from 'react';
import navigation from '../../config/navigation'
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export default navigation.map(({ icon: Icon, path, label }, index) => (
  <Link to={path} key={index}>
    <ListItem>
      {/* <ListItemIcon>
        <Icon />
      </ListItemIcon> */}
      <ListItemText
        primary={label}
      />
    </ListItem>
  </Link>
))
