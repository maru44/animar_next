import HighCharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighChartsReact from "highcharts-react-official";
import { NextComponentType, NextPage, NextPageContext } from "next";

if (typeof HighCharts === "object") {
  HighchartsExporting(HighCharts);
}

interface Props {
  lst: number[];
  title: string;
}

const WatchStateGraph: NextPage<Props> = (props) => {
  const options: HighCharts.Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: props.title,
    },
    series: [
      {
        type: "line",
        data: props.lst,
      },
    ],
    xAxis: {
      categories: ["脱落", "興味", "視聴中", "完了", "周回済み"],
      title: null,
    },
    yAxis: {
      min: 0,
      title: {
        text: "(人)",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        stacking: "normal",
      },
    },
  };

  return (
    <div>
      <HighChartsReact highcharts={HighCharts} options={options} />
    </div>
  );
};

export default WatchStateGraph;
