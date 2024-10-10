# Changes

## 1.5.4

- Progress steppers have been improved spacing wise.(For both the grid/list view)
- Changed padding and margin for score (list view) and score input (grid).
- Animation for blinking button to help the user to remember to update.

## 1.5.3

- Sort menu options in seasons list have been rearranged.
- By default, anime is sorted by popularity in the seasons list section.
- This default seasons sort can be changed within the settings menu under application.

## 1.5.2

- Releasing/Not Yet Released anime list cards now have the next airing episode timer just like the seasonal anime cards.
- Next Airing Time is now shown as a sort option on the user's anime list.
- An option has been added to the settings menu to hide/show the next airing time for anime media cards in the user's anime list. By default the option is set to show.

## 1.5.1

- Changed list table header and container colors.
- Highlighted list table row color is now darker for better visibility.
- Notes icon is now matching for all views (grid, compact, list).
- New repeat icon is now shown to indicate rewatching/rereading media.
  **Below are the requirements for the repeat icon to show up on a specific media:**

1. The repeat icon will only show on media that are outside of the completed tab.
2. For a media to be considered rewatching/rereading, the media must have a completed date or have a total rewatch/reread count greater than 0. It only needs to fulfill **ONE** of these requirements **(complete date or count requirement)**.

## 1.5.0

### Main Changes

- List view has been upgraded to a new headless ui library. New look, feel, and performance!
- Row Virtualization is fixed in the list view.
- List media progress (episode, chapters, volumes) can now be edited while in list view.
- The context menu is now shown when the user clicks the secondary mouse button in the list view. This is to match the same behavior as the grid and compact view media cards.
- In the list view, tooltips are now shown when you hover over the a row's status circle, notes, and the on-list icons.

### Other Changes

- Users can now click on images from main app window to move to the next trailer instead of defaulting to the more information/edit part of the advanced view window. (Great for cycling through anime trailers in the seasons tab).
- When countdown reaches 0 for the cards in season, the timer text will become 'Episode Aired'.
- Current username is now shown to the user under the setting's account information.
- Adjusted the width of add to list dropdown for media advanced view.

## 1.4.9

- When saving account information, there is now a notification to show whether the authentication information is valid or not. (Success/Failed to authenticate messages)
- Grid view list media cards have changed visually (score select, update buttons, progress buttons) to a blue outlined theme.
- Progress bar now scales in width along with episode/chapter/volume text.
- Fixed bug for when user tries to sync without correct username/token.

## 1.4.8

- Replaced the indicator tooltip with a progress bar for the grid media cards. These progress bars indicate progress towards completing the media and shows the available episodes available. Grid card's information section margin spacing has changed.
- Buttons for adding or removing progress have been changed to a blue highlighted color.
- Tooltips for inputting the account information have been added. These tooltips show example images of what to input in the corresponding fields.

## 1.4.7

- Redesigned the season search menu. The year select is now an input to allow for easier entry. Moved the search bar to the bottom. Colors were changed in the season search menu for the inputs and search.
- Tooltips for top sidebar are now outlined blue to be a similar style with the rest of the app.

## 1.4.6

- Advanced anime window now shows an info icon w/ tooltip showing number of episodes aired for currently releasing anime.
- Light blue outline will show up when the user is caught up with episodes of currently airing anime.
- Tooltips except for the top sidebar ones are now all outlined blue.

## 1.4.5

- For currently airing anime, you can now see how many episodes have aired in grid view.
- Users can now see the notes they write for each media on their list by hovering the comment icon. Added tooltips for notes and on list icons for grid and compact view.
- Added margin for on list and note icons for a better look.
- Changed icon for notes from notepad to a comment icon.
- Removed colons from labels on the main list media cards.

## 1.4.4

- Changed color of scrollbar back to blue.
- Added some spacing for the update button in grid view for a cleaner look.
- Lowered the overscanning number for virtualization in list view to help with smoother scrolling.

## 1.4.3

- Made the default descending sort for Next Airing Time be the earliest time to allow users to easily view the next airing seasonal anime.
- Changed color of scrollbar to a grayish color.
- Shortened the height of add to list select options.

## 1.4.2

- Made add to list select options go downward and scrollable.
- Changed list view's menu color for better visibility.
- Set default All color to white for advanced filtering icon.

## 1.4.1

- Fixed a rendering issue with the list view.
- Reordered the toolbar's help menu.
- Made toolbar option for reset settings to reflect changes without having to restart app.

## 1.4.0

### Main Changes

- Advanced filtering is now available.The filter/sort list has now been updated to include an explanation of how advanced filtering works. The explanation can be found [here](https://github.com/ReStartQ/anicour/blob/main/help/FilterAndSortList.md)
- Rewatch/reread feature now implemented when updating through grid media cards that are not in completed section.
  (adds to total rereads/rewatches if the media has a complete date or a total repeat count > 0).
- Preview season early feature is now in the settings menu, default setting is now early season change.
- About section with version number of the app and the changelog between versions.
- New infomration for advanced media window: episode duration(anime) and end date(manga/light novels).

### Toolbar changes

- Added changelog link for toolbar under help section.
- Added bug/issue link for toolbar under help section.
- Added Reset Settings option for toolbar under file section.
- Added issues option to allow for users to quickly report issues.

### Other changes

- Changed color elevation of context menu for better visibility.
- Bolded information labels.
- Reordered the information properties in advanced media window.
- "Not Yet Released" text changed to "Not yet released"
- Changed 'Average Score' to 'Avg. Score'.

## 1.3.2

- Just added type filter. An updated list of what you can filter/sort by can be found [here](https://github.com/ReStartQ/anicour/blob/main/help/FilterAndSortList.md).

## 1.3.1

- Fixed Completed section for users who use AniList's **Split Completed List Section by Format** setting.

## 1.3.0

- Fixed the issue for AniList users not being able to link their account to the app. (I used a secondary account to confirm it this time).

## 1.2.0

- Fixed status error bug.
- Added tooltips for list view toggle buttons.

## 1.1.0

- Removed scrolling for x-axis on sidebar for screens that are small or if resizing
- Fixed card positioning for entering news on smaller screens
- Changed up button icons for settings menu.

## 1.0.1

- Made settings window modal and set resizable + minimizable to false.
- Added icons for buttons in settings menu.

## 1.0.0

AniCour First Release!
