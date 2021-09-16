let Toast = {}

Toast.install = function(Vue, options) {
    let opt = {
        defaultType: 'center', // 默认显示的位置
        duration: '1500' // 持续时间
    }

    for (let property in options) {
        opt[property] = options[property]
    }
    Vue.prototype.$toast = (tips, type) => {
        if (type) {
            opt.defaultType = type
        }
        let toastTpl = Vue.extend({
            template: `<div class="vue-toast toast-${opt.defaultType}">${tips}</div>`
        })

        let tpl = new toastTpl().$mount().$el;// 将插件挂载到vue根节点
        document.body.appendChild(tpl)
        setTimeout(function() {
            document.body.removeChild(tpl)
        }, opt.duration)
    }
    
    ['bottom', 'center', 'top'].forEach(type => {
        Vue.prototype.$toast[type] = (tips) => {
            return Vue.prototype.$toast(tips, type)
        }
    })
}

// this.$toast({type: 'bottom', duration: 3000})
// this.$toast.top('hello')

export {
    Toast
}