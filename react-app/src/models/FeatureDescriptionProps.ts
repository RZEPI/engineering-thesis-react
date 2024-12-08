import { Site } from "./Site";

export type FeatureDescriptionProps = {
    site: Site,
    isFirst: boolean,
    isLast: boolean,
    onPreviousClick: () => void,
    onNextClick: () => void
}