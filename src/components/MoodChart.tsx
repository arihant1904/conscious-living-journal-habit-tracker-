
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface MoodDataPoint {
  day: string;
  level: number;
}

interface MoodChartProps {
  data: MoodDataPoint[];
}

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const config = {
    mood: {
      label: "Mood Level",
      color: "#8FAD88",
    }
  };

  return (
    <Card className="bg-white border-journal-taupe/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center text-journal-forest">
          <Clock size={18} className="mr-2 text-journal-sage" />
          Weekly Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#B79B8C', fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 10]} 
                  tickCount={6} 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#B79B8C', fontSize: 12 }}
                  width={30}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  name="mood" 
                  stroke="#8FAD88" 
                  strokeWidth={2} 
                  dot={{ fill: '#8FAD88', r: 4 }}
                  activeDot={{ r: 6, fill: '#4A6352' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
