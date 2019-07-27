"use strict";
import ObserveModelMixin from "./ObserveModelMixin";
import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import Icon from "./Icon.jsx";

import Styles from "./loader.scss";

const Loader = createReactClass({
  displayName: "Loader",
  mixins: [ObserveModelMixin],

  getDefaultProps() {
    return {
      className: "",
      message: "加载中..."
    };
  },

  propTypes: {
    message: PropTypes.string,
    className: PropTypes.string
  },

  render() {
    return (
      <span className={Styles.loader}>
        <Icon glyph={Icon.GLYPHS.loader} />
        <span>{this.props.message || "加载中"}</span>
      </span>
    );
  }
});
module.exports = Loader;
