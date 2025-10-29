import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function ProjectCard({
  title,
  blurb,
  tags = [],
}: {
  title: string;
  blurb: string;
  tags?: string[];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gradient-to-br from-[#22D3EE]/30 via-transparent to-transparent" />
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-white/70 mb-4">{blurb}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
