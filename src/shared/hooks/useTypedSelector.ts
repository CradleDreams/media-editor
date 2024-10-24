import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../entities/store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
