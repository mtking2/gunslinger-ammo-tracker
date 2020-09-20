import React from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import './index.sass';


export default class Tracker extends React.Component {
  constructor(props) {
    super(props);

    let bullets = [];
    for (let i = 0; i < props.startingAmmo; i++) {
      bullets[i] = { fired: false }
    }

    this.state = { 
      clipSize: props.startingAmmo,
      ammo: [],
      bullets: bullets
    };
  }

  handleChange(index) {
    let bullets = [...this.state.bullets];
    bullets[index].fired = !bullets[index].fired;
    this.setState({ bullets }); 
  }

  inc() {
    if (this.state.clipSize < 20) {
      let bullets = [...this.state.bullets];
      bullets.push({ fired: false });
      this.setState({ bullets: bullets, clipSize: bullets.length }); 
    }
  }

  dec() {
    if (this.state.clipSize > 1) {
      let bullets = [...this.state.bullets];
      bullets.pop();
      this.setState({ bullets: bullets, clipSize: bullets.length }); 

    }
  }

  reload() {
    let bullets = [...this.state.bullets];
    bullets.forEach(bullet => {
      bullet.fired = false;
    });
    this.setState({ bullets }); 
  }

  render() {
    const { bullets } = this.state;
    
    return (
      <div>
        {bullets.map( (bullet, index) => (
          <Checkbox
            checked={bullet.fired}
            onChange={() => this.handleChange(index)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            indeterminate
          />
        ))}
        <br/>
        <Button variant="contained" color="primary" onClick={() => this.dec()}>
          -
        </Button>
        <Button className="reload-btn" variant="contained" color="primary" onClick={() => this.reload()}>
          Reload
        </Button>
        <Button variant="contained" color="primary" onClick={() => this.inc()}>
          +
        </Button>
      </div>
    );
  }
}
