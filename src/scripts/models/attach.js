
let dataInfo = [
    {

    }
];

export default {
    namespace: 'attach',
    state: {
        dataInfo: '',//,
        showWhich: '',
        showText: '',
    },
    reducers: {
        setKeyValue(state, action) {
            console.log('toggleData', state, action);
            return { ...state, ...action.payload };
        }
    },
    effects: {

    }
}