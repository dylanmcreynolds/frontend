import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "state-management/state/user.store";

const selectUserState = createFeatureSelector<UserState>("users");

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.currentUser
);

export const selectCurrentUserId = createSelector(selectCurrentUser, (user) =>
  user ? user.id : ""
);

export const selectProfile = createSelector(
  selectUserState,
  (state) => state.profile
);

export const selectCurrentUserName = createSelector(
  selectProfile,
  selectCurrentUser,
  (profile, user) => {
    if (profile) {
      return profile.username.replace("ms-ad.", "");
    } else if (user) {
      return user.username.replace("ms-ad.", "");
    } else {
      return null;
    }
  }
);

export const selectThumbnailPhoto = createSelector(selectProfile, (profile) => {
  if (
    profile &&
    profile.thumbnailPhoto &&
    profile.thumbnailPhoto.startsWith("data")
  ) {
    return profile.thumbnailPhoto;
  }

  return "assets/images/user.png";
});

export const selectIsAdmin = createSelector(
  selectCurrentUserName,
  (name) => name && ["admin", "archiveManager", "ingestor"].indexOf(name) !== -1
);

export const selectCatamelToken = createSelector(
  selectUserState,
  (state) => state.catamelToken.id
);

export const selectUserMessage = createSelector(
  selectUserState,
  (state) => state.message
);

export const selectSettings = createSelector(
  selectUserState,
  (state) => state.settings
);

export const selectTapeCopies = createSelector(
  selectSettings,
  (settings) => settings.tapeCopies
);

export const selectTheme = createSelector(
  selectSettings,
  (settings) => settings.darkTheme
);

export const selectIsLoggingIn = createSelector(
  selectUserState,
  (state) => state.isLoggingIn
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state) => state.isLoggedIn
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectColumns = createSelector(
  selectUserState,
  (state) => state.columns
);

export const selectSampleDialogViewModel = createSelector(
  selectCurrentUser,
  selectProfile,
  (user, profile) => ({ user, profile })
);
