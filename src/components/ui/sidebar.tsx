import { cn } from "@/lib"

function SidebarRoot({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex min-h-screen w-full")} {...props}>
      {children}
    </div>
  )
}

function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside className={cn("flex flex-col px-[28px] md:min-w-[250px]")} {...props}>
      {children}
    </aside>
  )
}

function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn()} {...props}>
      {children}
    </div>
  )
}

function SidebarBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grow")} {...props}>
      {children}
    </div>
  )
}

function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 w-full")} {...props}>
      {children}
    </div>
  )
}

function MainContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="min-h-full grow">
      <div className="h-[10px] bg-neutralgrey-100 dark:bg-neutralgrey-1300"></div>
      <main className={cn("min-h-full grow overflow-y-scroll rounded-tl-md rounded-tr-xl bg-base-white p-4 !text-black")} {...props}>
        {children}
      </main>
    </div>
  )
}

export { MainContent, Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarRoot }
