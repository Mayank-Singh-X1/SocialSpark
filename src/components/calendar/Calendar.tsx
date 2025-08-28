'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Drafts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="p-3 border rounded-lg bg-muted/50 cursor-grab">
                        <p className="font-semibold text-sm">Summer Sale Announcement</p>
                        <p className="text-xs text-muted-foreground">Instagram Post</p>
                    </div>
                     <div className="p-3 border rounded-lg bg-muted/50 cursor-grab">
                        <p className="font-semibold text-sm">Weekly Q&A</p>
                        <p className="text-xs text-muted-foreground">X Post</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4"/></Button>
                        <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4"/></Button>
                    </div>
                    <CardTitle>June 2024</CardTitle>
                    <Button variant="outline">Today</Button>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed rounded-lg min-h-[600px] flex items-center justify-center">
                        <p className="text-muted-foreground">Full calendar view coming soon!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
