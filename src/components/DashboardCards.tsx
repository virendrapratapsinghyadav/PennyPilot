import {
  BanknoteArrowDown,
  EllipsisVertical,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface DashboardCardProps {
  classname?: string
  title: string;
  amount: number;
  percentage: number;
  change: number;
}

const DashboardCards = ({
  classname,
  title,
  amount,
  percentage,
  change,
}: DashboardCardProps) => {
  return (
    <div className="w-full">
      <Card
        className={`
          group
          relative
          overflow-hidden
          rounded-none
          border-2
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-[4px_4px_0_var(--shadow-color)]
          ${classname}
        `}
        style={{
          clipPath:
            "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
        }}
      >
        {/* Accent line */}
        <div className="absolute left-0 top-0 h-px w-12 bg-primary opacity-70 transition-all duration-300 group-hover:w-20" />

        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            {/* Title */}
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  border
                  border-border
                  bg-background
                  text-muted-foreground
                  transition-colors
                  duration-300
                  group-hover:border-primary/40
                  group-hover:text-primary
                "
                style={{
                  clipPath:
                    "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
                }}
              >
                <BanknoteArrowDown size={18} strokeWidth={1.8} />
              </div>

              <span className="truncate text-sm font-black uppercase tracking-wider text-foreground sm:text-base">
                {title}
              </span>
            </div>

            {/* More */}
            <button
              type="button"
              aria-label={`More options for ${title}`}
              className="
                shrink-0
                p-1
                text-muted-foreground
                transition-colors
                duration-200
                hover:text-primary
              "
            >
              <EllipsisVertical size={19} strokeWidth={2} />
            </button>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap items-center gap-3 pb-4">
          {/* Amount */}
          <span className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            {amount < 0 ? "-" : ""}₹{Math.abs(amount).toFixed(2)}
          </span>

          {/* Percentage */}
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              border
              border-border
              bg-background
              px-2
              py-1
              text-xs
              font-bold
              text-muted-foreground
              transition-colors
              duration-200
              group-hover:border-primary/30
            "
            style={{
              clipPath:
                "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
            }}
          >
            {change > 0 ? (
              <TrendingUp
                size={14}
                className="text-primary"
                strokeWidth={2.5}
              />
            ) : (
              <TrendingDown
                size={14}
                className="text-muted-foreground"
                strokeWidth={2.5}
              />
            )}

            <span>
              ₹{Math.abs(percentage).toFixed(2)}%
            </span>
          </span>
        </CardContent>

        <CardFooter className="border-t border-border/60 pt-3">
          <div className="flex items-center gap-2 text-xs">
            <span
              className={
                change > 0
                  ? "font-black text-primary"
                  : "font-black text-muted-foreground"
              }
            >
              {change > 0 ? "+" : change < 0 ? "-" : ""}₹
              {Math.abs(change).toFixed(2)}
            </span>

            <span className="text-muted-foreground">
              from last month
            </span>
          </div>
        </CardFooter>

        {/* Bottom-right accent */}
        <div className="absolute bottom-0 right-0 h-px w-8 bg-primary/40 transition-all duration-300 group-hover:w-14" />
      </Card>
    </div>
  );
};

export default DashboardCards;