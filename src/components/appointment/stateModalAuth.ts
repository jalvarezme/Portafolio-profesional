// // State management
// export let authState = {
//   isLoading: false,
//   error: null as string | null,
//   success: false,
// };

type stateAuth = {
  mode: string;
  modal: HTMLDialogElement | null;
};

export const stateModalAuth: stateAuth = {
  mode: "idle",
  modal: null,
};
