import React from 'react';

export default function DefaultContent() {
  return (
    <div style={styles.component}>
      <p>{this.props.message}</p>
    </div>
  );
}

const styles = {
  component: {
    display: 'flex',
    alignItems: 'center',
    jusitfyContent: 'center',
  }
};
