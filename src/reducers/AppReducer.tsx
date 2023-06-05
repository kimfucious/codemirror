import { createAction, createReducer } from "@reduxjs/toolkit";
import { ActionType } from "../types";

export interface Scene {
    id: string;
    text: string;
}
export interface AppState {
    abandonedSceneId: string;
    activeScene: Scene | undefined;
    draftActiveSceneText: string;
    scenes: Scene[];
}

const scenes = [
    { id: "1", text: "ABC" },
    { id: "2", text: "123" },
];

const initialState = {
    abandonedSceneId: "",
    activeScene: scenes[0],
    draftActiveSceneText: scenes[0].text,
    scenes,
} as AppState;

const abandonChanges = createAction<null>(ActionType.ABANDON_CHANGES);

const saveChanges = createAction<Scene>(ActionType.SAVE_CHANGES);

const setDraftSceneText = createAction<string>(
    ActionType.SET_DRAFT_ACTIVE_SCENE_TEXT
);
const setId = createAction<string>(ActionType.SET_ID);

const reducer = createReducer({ ...initialState }, (builder) => {
    builder
        .addCase(abandonChanges, () => {
            return initialState;
        })
        .addCase(saveChanges, (state,action) => {
            return {
                ...state,
                activeScene: action.payload,
            };
        })
        .addCase(setId, (state, action) => {
            return {
                ...state,
                abandonedSceneId: action.payload,
            };
        })
        .addCase(setDraftSceneText, (state, action) => {
            return {
                ...state,
                draftActiveSceneText: action.payload,
            };
        });
});

export default reducer;
