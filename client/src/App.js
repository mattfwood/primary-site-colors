import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './App.css';

const rgbHex = require('rgb-hex');

class App extends Component {
  state = {
    url: '',
    colors: [],
    loading: false,
  };

  handleInput = e => {
    const url = e.target.value;
    this.setState({ url });
  };

  getColors = async e => {
    try {
      e.preventDefault();
      // set loading icon
      this.setState({ loading: true });
      const { url } = this.state;
      const res = await axios.get(`http://localhost:5000/?url=${url}`);

      console.log(res);

      // map object keys into array
      const colors = Object.entries(res.data.colors)
        // map key value into array
        .map(item => {
          // preserve color type (vibrant, dull, etc)
          if (item[1] !== null) {
            const type = item[0];
            item = item[1];
            item.type = type;
            return item;
          }

          // return null if color wasn't found, to be filtered out in next step
          return item[1];
        })
        // filter out null colors
        .filter(item => item !== null);

      console.log(colors);

      this.setState({
        colors,
        loading: false,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    const { url, colors, loading } = this.state;
    return (
      <div className="App">
        <h4>Get Key Colors from Any Website</h4>
        <Form onSubmit={this.getColors}>
          <FormGroup>
            <Label for="exampleEmail">Enter URL</Label>
            <Input
              type="text"
              name="url"
              id="url"
              ref="url"
              value={url}
              onChange={e => this.handleInput(e)}
              autoFocus="true"
            />
          </FormGroup>
          <Button disabled={loading}>Get Key Colors</Button>
        </Form>
        {loading && <ReactLoading type="cylon" color="#000" />}
        {!loading && colors.length > 0 && <div>(Click Color to Copy Hex Code to Clipboard)</div>}
        <div className="color-section">
          {colors.map(color => {
            const colorCode = color._rgb.join(', ');
            const rgb = color._rgb.map(color => parseInt(color, 10));
            return (
              <div>
                <div className="hex-code">
                  <div>
                    {`#${rgbHex(...color._rgb)}`}
                  </div>
                  <div>
                    rgb{rgb.join(', ')}
                  </div>
                </div>
                <CopyToClipboard text={`#${rgbHex(...color._rgb)}`}>
                  <div
                    className="color-swatch"
                    style={{
                      backgroundColor: `rgb(${colorCode})`,
                    }}
                  />
                </CopyToClipboard>
                <div>{color.type}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
