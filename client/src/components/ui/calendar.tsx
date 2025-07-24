import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import { Button, buttonVariants } from "./button"

// Redesigned Calendar without `cn` dependency
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={
        [
          "bg-background group/calendar p-3",
          "[--cell-size:2rem]",
          "[[data-slot=card-content]_&]:bg-transparent",
          "[[data-slot=popover-content]_&]:bg-transparent",
          "rtl:**:[.rdp-button_next>svg]:rotate-180",
          "rtl:**:[.rdp-button_previous>svg]:rotate-180",
          className || ""
        ].join(" ")
      }
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: ["w-fit", defaultClassNames.root].join(" "),
        months: [
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ].join(" "),
        month: [
          "flex w-full flex-col gap-4",
          defaultClassNames.month
        ].join(" "),
        nav: [
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ].join(" "),
        button_previous: [
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ].join(" "),
        button_next: [
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ].join(" "),
        month_caption: [
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ].join(" "),
        dropdowns: [
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ].join(" "),
        dropdown_root: [
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ].join(" "),
        dropdown: [
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ].join(" "),
        caption_label: [
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ].join(" "),
        table: "w-full border-collapse",
        weekdays: ["flex", defaultClassNames.weekdays].join(" "),
        weekday: [
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ].join(" "),
        week: ["mt-2 flex w-full", defaultClassNames.week].join(" "),
        week_number_header: [
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ].join(" "),
        week_number: [
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ].join(" "),
        day: [
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ].join(" "),
        range_start: [
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ].join(" "),
        range_middle: [
          "rounded-none",
          defaultClassNames.range_middle
        ].join(" "),
        range_end: [
          "bg-accent rounded-r-md",
          defaultClassNames.range_end
        ].join(" "),
        today: [
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ].join(" "),
        outside: [
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ].join(" "),
        disabled: [
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ].join(" "),
        hidden: ["invisible", defaultClassNames.hidden].join(" "),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={className}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={["size-4", className].join(" ")} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={["size-4", className].join(" ")}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={["size-4", className].join(" ")} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={
        [
          "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
          defaultClassNames.day,
          className
        ].join(" ")
      }
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
