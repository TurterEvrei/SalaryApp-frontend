import {ResponsiveBar} from "@nivo/bar";
import theme from "../../theme/theme";
import {Box, Center} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";

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

    const [windowWidth, setWindowWidth] = useState<number>(useRef(window.innerWidth).current)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [window.innerWidth])

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
            margin={{
                top: 50,
                right:  windowWidth > 500 ? 130 : 0,
                bottom:  50,
                // bottom: windowWidth > 500 ? 50 : 150,
                left:  windowWidth > 500 ? 60 : 40}}
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
                    anchor:  windowWidth > 500 ? "bottom-right" : "bottom",
                    // direction: "row",
                    direction: windowWidth > 500 ? "column" : "row",
                    justify: false,
                    translateX:  windowWidth > 500 ? 90 : 0,
                    translateY: windowWidth > 500 ? 0 : 50,
                    // translateY: windowWidth > 500 ? 50 : 150,
                    itemsSpacing: 0,
                    itemWidth: 50,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: windowWidth > 500 ? 20 : 4,
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