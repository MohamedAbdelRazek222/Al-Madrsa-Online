// You can live edit this code below the import statements
import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Transform from './Transform';

class ZoomExample extends React.Component {
  render() {
    return (
      <div>
        <Zoom left>
        <Transform />
        </Zoom>
      </div>
    );
  }
}

export default ZoomExample;
 