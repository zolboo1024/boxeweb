"use strict";
import React from 'react';

import Color from './Color';

class ColorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedColor: props.colors[0] };
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(color) {
        this.setState({selectedColor: color});
    }

    render() {
        return (
            <div>
                <p>
                    The selected color is {this.state.selectedColor}
                </p>
                <div>
                    {this.props.colors.map(color =>
                        <Color
                            key={color}
                            color={color}
                            changeColor={this.changeColor}
                            selectedColor={this.state.selectedColor}
                        />
                    )}
                </div>
            </div>
        );
    }

    static get defaultProps() {
        return {
            colors: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
        };
    }
}

export default ColorList;