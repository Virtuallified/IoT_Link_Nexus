import React, { Component } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export class Chart3 extends Component {
  componentDidMount() {
    const root = am5.Root.new("chartdiv");

    // ... chart code goes here ...

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    let chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 180,
        endAngle: 360,
      })
    );

    chart.getNumberFormatter().set("numberFormat", "#'%'");

    // Create axis and its renderer
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
    let axisRenderer = am5radar.AxisRendererCircular.new(root, {
      innerRadius: -40,
    });

    axisRenderer.grid.template.setAll({
      stroke: root.interfaceColors.get("background"),
      visible: true,
      strokeOpacity: 0.8,
    });

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
    // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
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
      stroke: am5.color(0x000000),
      strokeWidth: 0.5,
    });

    let bullet = axisDataItem.set(
      "bullet",
      am5xy.AxisBullet.new(root, {
        sprite: clockHand,
      })
    );

    xAxis.createAxisRange(axisDataItem);

    let label = chart.radarContainer.children.push(
      am5.Label.new(root, {
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: "1.5em",
      })
    );

    axisDataItem.set("value", 50);
    bullet.get("sprite").on("rotation", function () {
      let value = axisDataItem.get("value");
      label.set("text", Math.round(value).toString() + "%");
    });

    setInterval(function () {
      let value = Math.round(Math.random() * 100);

      axisDataItem.animate({
        key: "value",
        to: value,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });

      axisRange0.animate({
        key: "endValue",
        to: value,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });

      axisRange1.animate({
        key: "value",
        to: value,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic),
      });
    }, 2000);

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

    // Make stuff animate on load
    chart.appear(1000, 100);

    this.root = root;
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "270px" }}></div>;
  }
}
