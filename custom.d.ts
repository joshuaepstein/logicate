declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>
  export default content
}

// allow navigation-header as a custom html tag
declare namespace JSX {
  interface IntrinsicElements {
    "navigation-header": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}
