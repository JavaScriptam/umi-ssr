export default {
  namespace: 'test',
  state: {
    title:'hhh',
    items:[]
  },
  effects: {},

  reducers: {
    test(state:any, { payload }:any) {
      state.items = payload
      state.title = JSON.stringify(payload)
    },
  },
};
