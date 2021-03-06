import HighCharts, { chart } from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighChartsReact from "highcharts-react-official";

if (typeof HighCharts === "object") {
  HighchartsExporting(HighCharts);
}

interface Props {
  lst: number[];
  title: string;
  width?: number;
}

const WatchStateGraphPie: React.FC<Props> = (props) => {
  const lst = props.lst;
  const dataList = [
    ["脱落", lst[0]],
    ["視聴中", lst[2]],
    ["視聴済み", lst[3]],
    ["周回済み", lst[4]],
  ];
  const options: HighCharts.Options = {
    title: {
      text: props.title,
    },
    series: [
      {
        name: "", //serieas
        type: "pie",
        pointWidth: 25,
        data: dataList,
        colors: ["#fac5b9", "#f25430", "#e82a00", "#a81f00"],
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: "(人)",
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          style: {
            textOutline: "none",
            color: "#1f1f1f",
          },
        },
      },
      series: {
        stacking: "normal",
      },
    },
    chart: {
      height: "72%",
      width: props.width,
    },
    responsive: {
      rules: [
        {
          condition: {
            minWidth: 0,
          },
        },
      ],
    },

    /*
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    */
  };

  return (
    <div>
      <HighChartsReact highcharts={HighCharts} options={options} />
    </div>
  );
};

export default WatchStateGraphPie;
