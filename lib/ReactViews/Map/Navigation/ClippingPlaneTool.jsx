"use strict";
import React from "react";
import PropTypes from "prop-types";
import createReactClass from "create-react-class";
import ObserveModelMixin from "../../ObserveModelMixin";
import Styles from "./tool_button.scss";
import Icon from "../../Icon.jsx";

const ClippingPlaneTool = createReactClass({
  displayName: "ClippingPlaneTool",
  mixins: [ObserveModelMixin],

  propTypes: {
    terria: PropTypes.object
  },

  handleClick() {
    this.state.userDrawing.enterDrawMode();
  },

  render() {
    return (
      <div className={Styles.toolButton}>
        <button
          type="button"
          className={Styles.btn}
          title="切面截取"
          onClick={this.handleClick}
        >
          <Icon glyph={Icon.GLYPHS.clippingPlane} />
        </button>
      </div>
    );
  }
});

export default ClippingPlaneTool;
