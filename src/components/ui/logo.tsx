import { Blocks } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Blocks className="h-8 w-8 text-primary" />
      <span className="text-3xl font-bold tracking-tight">
        <span className="text-primary">B</span>
        <span className="text-muted-foreground">rick</span>
      </span>
    </div>
  );
}