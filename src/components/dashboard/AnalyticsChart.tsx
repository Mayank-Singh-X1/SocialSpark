"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts"

const chartData = [
  { month: "January", likes: 186, comments: 80, shares: 20 },
  { month: "February", likes: 305, comments: 200, shares: 45 },
  { month: "March", likes: 237, comments: 120, shares: 30 },
  { month: "April", likes: 73, comments: 190, shares: 15 },
  { month: "May", likes: 209, comments: 130, shares: 35 },
  { month: "June", likes: 214, comments: 140, shares: 40 },
]

const chartConfig = {
  likes: {
    label: "Likes",
    color: "hsl(var(--primary))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--accent))",
  },
  shares: {
    label: "Shares",
    color: "hsl(var(--secondary))",
  },
}

export default function AnalyticsChart() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Engagement Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Legend />
            <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
            <Bar dataKey="comments" fill="var(--color-comments)" radius={4} />
            <Bar dataKey="shares" fill="var(--color-shares)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
