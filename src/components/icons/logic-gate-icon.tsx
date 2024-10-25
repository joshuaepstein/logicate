import { cn } from '@/lib'

export default function LogicGateIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    // <svg
    //   width="84"
    //   height="49"
    //   viewBox="0 0 84 49"
    //   fill="none"
    //   className={cn('fill-white text-black', className)}
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path
    //     d="M44 0.388321H58C67.3888 0.388321 75 7.99948 75 17.3883C75 26.7772 67.3888 34.3883 58 34.3883H44V0.388321Z"
    //     fill="currentFill"
    //   />
    //   <path d="M12 20.3883V1.38832L27 10.8883L12 20.3883Z" fill="currentFill" />
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M28.0094 9.38832L11 0V9.38832H0V13.3883H11V21.681L27 13.3694V13.3883H44V19.3883H34V44.3883H13V48.3883H38V23.3883H44V34.3883H58C66.7122 34.3883 73.8937 27.8347 74.8836 19.3883H84V15.3883H74.8836C73.8937 6.94198 66.7122 0.388321 58 0.388321H44V9.38832H28.0094ZM15 15.0956V6.77664L22.7644 11.0622L15 15.0956ZM58 4.38832H48V30.3883H58C65.1797 30.3883 71 24.568 71 17.3883C71 10.2086 65.1797 4.38832 58 4.38832Z"
    //     fill="currentColor"
    //   />
    // </svg>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn('text-black', className)}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9H3.5M3.5 9V6.5L7.5 9M3.5 9V11.5L7.5 9M7.5 9H12M12 9V6.5H15.5C16.8333 6.5 19.5 7.3 19.5 10.5M12 9V12M19.5 10.5C19.5 13.7 16.8333 14.5 15.5 14.5H12V12M19.5 10.5H22.5M12 12H9V18H4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
