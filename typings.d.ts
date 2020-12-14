
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare var API_BASE_URL: string;
declare var SERVER_API_BASE_URL: string;
declare var NODE_AXIOS_API_URL: string;