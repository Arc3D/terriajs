"use strict";

import classNames from "classnames";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import React from "react";

import defined from "terriajs-cesium/Source/Core/defined";
import ImagerySplitDirection from "terriajs-cesium/Source/Scene/ImagerySplitDirection";

// import Icon from '../../Icon';
import ObserveModelMixin from "../../ObserveModelMixin";
import Styles from "./left-right-section.scss";

const LeftRightSection = createReactClass({
  displayName: "LeftRightSection",
  mixins: [ObserveModelMixin],

  propTypes: {
    item: PropTypes.object.isRequired
  },

  goLeft() {
    this.props.item.splitDirection = ImagerySplitDirection.LEFT;
  },

  goBoth() {
    this.props.item.splitDirection = ImagerySplitDirection.NONE;
  },

  goRight() {
    this.props.item.splitDirection = ImagerySplitDirection.RIGHT;
  },

  render() {
    const item = this.props.item;
    const splitDirection = item.splitDirection;
    if (
      !item.supportsSplitting ||
      !defined(splitDirection) ||
      !item.terria.showSplitter
    ) {
      return null;
    }
    return (
      <div className={Styles.leftRightSection}>
        <button
          type="button"
          onClick={this.goLeft}
          className={classNames(Styles.goLeft, {
            [Styles.isActive]: splitDirection === ImagerySplitDirection.LEFT
          })}
          title="显示左侧"
        >
          左侧
        </button>
        <button
          type="button"
          onClick={this.goBoth}
          className={classNames(Styles.goBoth, {
            [Styles.isActive]: splitDirection === ImagerySplitDirection.NONE
          })}
          title="显示两侧"
        >
          两侧
        </button>
        <button
          type="button"
          onClick={this.goRight}
          className={classNames(Styles.goRight, {
            [Styles.isActive]: splitDirection === ImagerySplitDirection.RIGHT
          })}
          title="显示右侧"
        >
          右侧
        </button>
      </div>
    );
  }
});

module.exports = LeftRightSection;
