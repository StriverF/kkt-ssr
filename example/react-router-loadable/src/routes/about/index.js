import React from 'react';
import loadable from '@loadable/component';
import './index.css';

const Container = loadable(() => import('../../components/Container'));

class About extends React.Component {
  render() {
    return (
      <Container title="This About!">
        <div className="blue">
          About
        </div>
      </Container>
    );
  }
}

export default About;
