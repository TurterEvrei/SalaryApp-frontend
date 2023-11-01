import {ResponsiveBar} from "@nivo/bar";
import theme from "../../theme/theme";
import {Box, Center} from "@chakra-ui/react";

const BarChart = (
        {
            isDashboard = true,
            data,
            keys,
        }: {
            isDashboard?: boolean,
            data: Map<string, string>[],
            keys: string[],
        }
    ) => {
    const colors = theme.colors

    return (
        <ResponsiveBar
            //@ts-ignore
            data={data || []}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: colors.gray[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.gray[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.gray[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.gray[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.gray[100],
                    },
                },
            }}
            keys={keys}
            indexBy="date"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: "color",
                //@ts-ignore
                modifiers: [["darker", "1.6"]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Даты", // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Шекели", // changed
                legendPosition: "middle",
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            // labelTextColor={{
            //     // from: "color",
            //     // modifiers: [["darker", 1.6]],
            // }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in date: " + e.indexValue;
            }}
            //@ts-ignore
            tooltip={point => {
                return (
                    <Box bg={'dark.100'}
                         px={2}
                         py={1}
                         color={point.color}
                         borderRadius={2}
                    >
                        {`${point.id} - ${point.value}`}
                    </Box>);
            }}
        />
    );
};

export default BarChart;