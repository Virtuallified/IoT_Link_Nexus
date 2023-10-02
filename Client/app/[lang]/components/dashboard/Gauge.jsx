import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export class Gauge extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
      })
    );

    chart.getNumberFormatter().set("numberFormat", "#'°c'");

    // Create axis and its renderer
    let axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40,
    });

    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8,
    });

    // total radius
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer,
      })
    );

    // Add clock hand
    let axisDataItem = xAxis.makeDataItem({});

    let clockHand = am5radar.ClockHand.new(root, {
      pinRadius: 50,
      radius: am5.percent(100),
      innerRadius: 50,
      bottomWidth: 0,
      topWidth: 0,
    });

    clockHand.pin.setAll({
      fillOpacity: 0,
      strokeOpacity: 0.5,
      stroke: am5.color(0x000000),
      strokeWidth: 1,
      strokeDasharray: [2, 2],
    });

    clockHand.hand.setAll({
      fillOpacity: 0,
      strokeOpacity: 0.5,
      stroke: am5.color(0xff0000),
      strokeWidth: 0.5,
    });

    let bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      })
    );

    xAxis.createAxisRange(axisDataItem);

    // center digit location adjustment
    let label = chart.radarContainer.children.push(
      am5.Label.new(root, {
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "1.2em",
      })
    );

    // actual gauge reading value
    axisDataItem.set("value", 20);
    bullet.get("sprite").on("rotation", function () {
      let value = axisDataItem.get("value");
      label.set("text", Math.round(value).toString() + "°c");
    });

    chart.bulletsContainer.set("mask", undefined);

    let colorSet = am5.ColorSet.new(root, {});

    let axisRange0 = xAxis.createAxisRange(
      xAxis.makeDataItem({
        above: true,
        value: 0,
        endValue: 50,
      })
    );

    axisRange0.get("axisFill").setAll({
      visible: true,
      fill: colorSet.getIndex(0),
    });

    axisRange0.get("label").setAll({
      forceHidden: true,
    });

    let axisRange1 = xAxis.createAxisRange(
      xAxis.makeDataItem({
        above: true,
        value: 50,
        endValue: 100,
      })
    );

    axisRange1.get("axisFill").setAll({
      visible: true,
      fill: colorSet.getIndex(4),
    });

    axisRange1.get("label").setAll({
      forceHidden: true,
    });

    this.setState({ axisDataItem, axisRange0, axisRange1 });

    // Make stuff animate on load
    chart.appear(1000, 100);

    this.root = root;
  }

  componentDidUpdate() {
    const { temperature } = this.props;
    const { axisDataItem, axisRange0, axisRange1 } = this.state;

    // gauge value change on current update
    axisDataItem.animate({
      key: "value",
      to: temperature,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });

    // left axis
    axisRange0.animate({
      key: "endValue",
      to: temperature,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });

    // right axis
    axisRange1.animate({
      key: "value",
      to: temperature,
      duration: 500,
      easing: am5.ease.out(am5.ease.cubic),
    });
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    return (
      <div
        id="chartdiv"
        style={{ width: "100%", height: "270px", marginTop: "-8%" }}></div>
    );
  }
}
