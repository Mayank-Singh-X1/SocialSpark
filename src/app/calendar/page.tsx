import Calendar from '@/components/calendar/Calendar';

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Content Calendar
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
            Drag and drop your draft posts to schedule them.
        </p>
      </div>
      <Calendar />
    </div>
  );
}
