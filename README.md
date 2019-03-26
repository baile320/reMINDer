# reMINDer

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

TODOS:
  - Adding & re-rendering is so slow... issues with auth?
  - Improve the search in ReminderListVue, currently only searches for one tag.

  - VUEX Migration:
    - custom validator for tag/tags not working
    - Organize store.js into components, look to make simpler?
      - e.g. I had to change the controller for the edit -> save. maybe there is a nicer way to do that.