import { LineCharData, LineChartDebtData } from "@/type";
import { LineChart, ComboChart } from "@carbon/charts-react";
import { useMemo } from "react";

const DLineBar = ({data, debts}: {data: LineCharData[], debts: LineChartDebtData[]}) => {
    const correspondingDatasets = useMemo(() => {
        return debts.map(debt => debt.name);
    },[debts]);
    return <LineChart
    data={[...data]}
    options={{
        title: '',
        axes: {
            bottom: {
                title: 'Months',
                mapsTo: "key",
                scaleType: "labels" as any
            },
            left: {
                title: 'Asset (USD)',
                mapsTo: "asset",
                // scaleType: "linear" as any
            },
            right: {
              title: 'Debt (USD)',
              mapsTo: "debt",
              // scaleType: "linear" as any
            }
        },
        height: "400px"
    }}
  ></ LineChart>;
}


export default DLineBar;


const DComboLineBar = ({data, debts}: {data: LineCharData[], debts: LineChartDebtData[]}) => {
    const correspondingDatasets = useMemo(() => {
        return debts.map(debt => debt.name);
    },[debts]);
    return <ComboChart
    data={[...data]}
    options={{
        axes: {
          left: {
            title: "Asset (USD)",
            mapsTo: "asset",
          },
          right: {
            title: "Debt (USD)",
            mapsTo: "debt",
            correspondingDatasets: correspondingDatasets,
          },
          bottom: {
            title: "Months",
            scaleType: "labels" as any,
            mapsTo: "key",
          },
        },
        comboChartTypes: [
          {
            type: "simple-bar",
            options: {},
            correspondingDatasets: ["Assets"],
          },
          {
            type: "line",
            options: {
              points: {
                enabled: true,
              },
            },
            correspondingDatasets: correspondingDatasets,
          },
        ],
        legend: {
          alignment: "center" as any,
        },
        // curve: "curveNatural",
        timeScale: {
          addSpaceOnEdges: 0,
        },
        height: "600px",
      }}
  ></ ComboChart>;
}