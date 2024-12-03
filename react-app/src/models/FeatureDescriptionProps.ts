import { SidebarLinkProps } from "./SidebarLink";

export type FeatureDescriptionProps = {
    site: SidebarLinkProps,
    isFirst: boolean,
    isLast: boolean,
    onPreviousClick: () => void,
    onNextClick: () => void
}