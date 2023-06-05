import { createAction, createReducer } from "@reduxjs/toolkit";

export interface Scene {
  id: string;
  text: string;
}
export interface AppState {
  abandonedSceneId: string;
  scenes: Scene[];
}
const original = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

const initialState = {
  abandonedSceneId: "",
  scenes: [{ id: "123", text: original }]
} as AppState;

const setId = createAction<string>("SET_ID");

const reducer = createReducer({ ...initialState }, (builder) => {
  builder.addCase(setId, (state, action) => {
    return {
      ...state,
      abandonedSceneId: action.payload
    };
  });
});

export default reducer;
