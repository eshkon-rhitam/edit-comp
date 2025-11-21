import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComponentState {
  selected: string | null;
  theme: string;
}

const initialState: ComponentState = {
  selected: "Card",
  theme: "theme-light",
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    selectComponent(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export const { selectComponent, setTheme } = componentSlice.actions;
export default componentSlice.reducer;
