export type SelectInputProps = {
    selectHeader: string,
    optionList: string[],
    selectionFunc: (chosenOption:string) => void
}