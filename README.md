# Kroon Studio Test Task

## Task 1

### First Task Definition

**Question:** What are the issues in the page, how would you fix it?

**Source:** [link to file](https://github.com/kroon-digital-studio/rn_rjs_task_2020/blob/master/rnQuestion1.js)

### First Task Solution

> Missing imports and semicolons. **(Optional)**

Not sure if local imports were omitted on purpose, however, references to `People`, `House`, `fetchPeople` and `styles` are missing their corresponding import statements or declarations.
I would simply add those local imports under the external import statements.

Same goes for missing semicolons on lines: `20`, `33`.
Despite that JavaScript compiler is not strict about omitting semicolons, it can be error-prone at times when parser is not just smart enough to make a guess about line end.
I would add such tools as `ESLint` and `Prettier` to my project so that part is automated.

> App is missing store provider (given that App.jsx is a root).

In case if `App.jsx` is a root component it must return redux store `<Provider />` so that child components can access the redux store.

I would `import { Provider } from 'react-redux'` and placed it before any of the _meaningful_ UI- or logic- components.
Of course, `<Provider />` should take a `store` reference as a prop.

> Conventionally `App.jsx` is a root-level component which exists to set up the environment.

`App.jsx` must not contain _meaningful_ UI or business logic. Instead, the component should contain various root-level providers essential for the application (Redux, UI Theming, REST API/GraphQL, Routing/Navigation etc.)

I would move the logic to corresponding child components and leave `App.jsx` free of any implementation.

> `this.props.fetchPeople()` in `render()` method.

Apparently `this.props.fetchPeople()` triggers mutation of `this.props.people`.
No props mutation should ever happen inside `render` method as it causes constant re-rendering of the component due to constant changes in props.

Instead, I would move this call to something like `componentDidMount()` life-cycle method.

> `mapStateToProps()` uses complex functions that are most likely returning new object instances.

As all of the fields of the object returned by `mapStateToProps()` are compared to the previous version using _shallow equality_, `this.props.people` and `this.props.houses` will always be different even though `state.people.data` and `state.houses` have not changed at all, thus triggering unnecessary re-renders of the components.

Futhermore, it's highly recommended to avoid complex transformations inside of `mapStateToProps()` as those functions' purpose is mainly a data retrieval.

In case the transformation cannot be avoided I would use memoized selector functions from `Reselect` library to prevent unnecessary execution and re-renders.

> Unneeded complex form of `mapDispatchToProps()`.

Given that there is only one action that can be dispatched and no additional logic is required, `mapDispatchToProps()` can be defined as just plain object with action creators mapped to its fields.

## Task 2

### Second Task Definition

Using the API below, which will fetch Github gists, display each user’s avatar `owner.avatar_url` and files name `files.xxx` in a list.
The list needs to be high performance, well structured, and easy to maintain.

**Link for more details:** https://www.figma.com/file/QLYgR8ZxBIM9rUgToDfCB3KE/TZ-Interview-advanced?node-id=0%3A1

**API:** https://api.github.com/gists/public \
**API Doc:** https://developer.github.com/v3/gists/#list-all-public-gists

You can use start will RN template project using CLI: `react-native init TestOne`

**In each row:**

- profile image is from `array[n].owner.avatar_url`
- File name is from `array[n].files.xxx`

**Requirements:**

- Infinite scroll
- Scrolling the list should be smooth
- Smooth animation when image is fading in and out

**_Bonus:_** When clicking on the row, the selected profile image will fade in the center of the
screen and fade out in 1 second.

### Second Task Solution

Test application's source code resides in the repository's `./src` directory.

Use `npm start` or `yarn start` to start bundling.
