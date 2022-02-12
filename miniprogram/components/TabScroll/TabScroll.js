// components/TabScroll/TabScroll.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabItem: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    lifetimes: {
        ready: function () {
            let tabItem = this.properties.tabItem;
            let tabItemLength = [];
            tabItem.map(item => {
                tabItemLength.push(item["title"].length)
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {

    }
})
