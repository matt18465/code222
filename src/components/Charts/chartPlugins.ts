import {
  ChartData,
  ChartOptions,
  Plugin,
  Chart,
  LegendItem,
  ExtendedPlugin,
} from "chart.js";

// https://www.youtube.com/watch?v=zWSIh4tV7wc
export const hoverLine: Plugin = {
  id: "hoverLine",
  beforeDatasetsDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { top, bottom },
    } = chart;
    // @ts-ignore
    const tooltipActive = tooltip?._active[0];
    if (tooltipActive) {
      ctx.beginPath();
      ctx.strokeStyle = "#0058FF";
      ctx.lineWidth = 1;
      ctx.moveTo(tooltipActive.element.x, top);
      ctx.lineTo(tooltipActive.element.x, bottom);
      ctx.stroke();
      ctx.restore();
    }
  },
};

const getOrCreateLegendList = (id: string) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer?.querySelector("ul");
  if (!listContainer) {
    listContainer = document.createElement("ul");

    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = "0";
    listContainer.style.padding = "0";

    legendContainer?.appendChild(listContainer);
    legendContainer!.style.width = "100%";
  }

  return listContainer;
};

export const htmlLegendPlugin: Plugin<"doughnut"> = {
  id: "htmlLegend",
  afterUpdate(chart: any, args, options) {
    const ul = getOrCreateLegendList(options.containerID);
    const listStyles = ul.style;

    listStyles.width = "100%";
    listStyles.display = "flex";
    listStyles.flexDirection = "column";
    listStyles.gap = "1rem";
    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }
    // Reuse the built-in legendItems generator
    const items =
      chart?.options?.plugins?.legend?.labels?.generateLabels(chart);
    const datasets = chart?.data.datasets;
    items?.forEach((item: LegendItem, i: number) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = ".5rem";
      li.style.fontSize = "1rem";
      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan: HTMLElement = document.createElement("span");
      boxSpan.style.background = item!.fillStyle!.toString();
      boxSpan.style.borderColor = item!.strokeStyle!.toString();
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = "0";
      boxSpan.style.height = "1rem";
      boxSpan.style.borderRadius = "4px";
      boxSpan.style.marginRight = "1.5rem";
      boxSpan.style.width = "1rem";

      // Text
      const textContainer = document.createElement("span");
      textContainer.style.margin = "0";
      textContainer.style.padding = "0";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";
      //Value
      const valueContainer = document.createElement("span");
      valueContainer.style.margin = "0";
      valueContainer.style.padding = "0";
      valueContainer.style.marginLeft = "auto";
      valueContainer.style.fontWeight = "bold";
      valueContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      const value = document.createTextNode(datasets[0].data[i] + "%");
      textContainer.appendChild(text);
      valueContainer.appendChild(value);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      li.appendChild(valueContainer);
      ul.appendChild(li);
    });
  },
};
export const legendMargin: Plugin = {
  id: "legendMargin",
  beforeInit(chart: any, args, options: any) {
    const fitValue = chart.legend.fit;
    chart.legend.fit = function fit() {
      fitValue.bind(chart.legend)();
      return (this.height += options?.margin || 30);
    };
  },
};
